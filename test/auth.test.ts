import CryptoJS from "crypto-js";

import { setupRecording, setupAPI } from "../test/setup";
import { SaleorSDK } from "../src/core";
import { SECRET_KEY, TEST_AUTH_EMAIL, TEST_AUTH_PASSWORD } from "../config";

describe("auth api", () => {
  const context = setupRecording();
  const { client } = setupAPI();
  const saleor = SaleorSDK(client);

  beforeEach(() => {
    const { server } = context.polly;
    server.any().on("beforePersist", (_, recording) => {
      recording.request = CryptoJS.AES.encrypt(
        JSON.stringify(recording.request),
        SECRET_KEY
      ).toString();
      recording.response = CryptoJS.AES.encrypt(
        JSON.stringify(recording.response),
        SECRET_KEY
      ).toString();
    });
  });

  it("can login", async () => {
    const { data } = await saleor.auth.login(
      TEST_AUTH_EMAIL,
      TEST_AUTH_PASSWORD
    );
    expect(data.tokenCreate.user.id).toBeDefined();
    expect(data.tokenCreate.token).toBeDefined();
    expect(data.tokenCreate.errors).toHaveLength(0);
  });

  it("will throw an error if credentials are invalid", async () => {
    const { data } = await saleor.auth.login("sdk@example.com", "test");
    expect(data.tokenCreate.user).toBeFalsy();
    expect(data.tokenCreate.token).toBeFalsy();
    expect(data.tokenCreate.errors).not.toHaveLength(0);
  });

  it("can logout", async () => {
    await saleor.auth.logout();
    // TODO: write expect calls when ready
  });
});
