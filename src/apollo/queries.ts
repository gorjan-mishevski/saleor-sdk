import { gql } from "@apollo/client";

export const testQuery = gql`
  query GetFiveProducts {
    products(first: 5) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

// import { checkoutFragment, checkoutProductVariantFragment, userFragment } from "./fragments";

// export const getUserDetailsQuery = gql`
//   ${userFragment}
//   query UserDetails {
//     me {
//       ...User
//     }
//   }
// `;

// export const checkoutDetails = gql`
//   ${checkoutFragment}
//   query CheckoutDetails($token: UUID!) {
//     checkout(token: $token) {
//       ...Checkout
//     }
//   }
// `;

// export const userCheckoutTokenList = gql`
//   query UserCheckoutTokenList($channel: String) {
//     me {
//       id
//       checkoutTokens(channel: $channel)
//     }
//   }
// `;

// export const checkoutProductVariants = gql`
//   ${checkoutProductVariantFragment}
//   query CheckoutProductVariants($ids: [ID], $channel: String) {
//     productVariants(ids: $ids, first: 100, channel: $channel) {
//       edges {
//         node {
//           ...ProductVariant
//         }
//       }
//     }
//   }
// `;
