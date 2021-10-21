import { gql } from "@apollo/client";

const ITEM_DETAILS = gql`
  query GetItemDetails($url: String!) {
    itemDetails(url: $url) {
      name
      url
      image
      vendor {
        name
        logo
      }
    }
  }
`;

export default ITEM_DETAILS;
