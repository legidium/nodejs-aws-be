import {APIGatewayProxyHandler} from "aws-lambda";
import * as products from "../data/products.json";
import {createResponse} from "../utils";

export const getProductsList: APIGatewayProxyHandler = async () => {
  const {items} = products;
  return createResponse(200, {
    data: items,
    total: items.length
  });
}
