import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const UPDATE_ORDER_MUTATION = `
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default async function gigfiliateOrderSetAffiliateID(
  session
) {
  const client = new shopify.api.clients.Graphql({ session });
  const order_id = '4155787575360';
  try {
    return await client.query({
      data: {
        query: UPDATE_ORDER_MUTATION,
        variables: {
          "metafields": [
            {
              "key": "gigAffiliate",
              "namespace": "custom",
              "ownerId": "gid://shopify/Order/" + order_id,
              "type": "single_line_text_field",
              "value": "789"
            },
            {
              "key": "gigType",
              "namespace": "custom",
              "ownerId": "gid://shopify/Order/" + order_id,
              "type": "single_line_text_field",
              "value": "customer"
            },
            {
              "key": "gigOrderId",
              "namespace": "custom",
              "ownerId": "gid://shopify/Order/" + order_id,
              "type": "single_line_text_field",
              "value": "123"
            },
          ]
        },
      },
    });
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
