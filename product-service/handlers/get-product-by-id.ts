import {APIGatewayProxyHandler} from "aws-lambda";
import {Product} from "../interfaces/product";
import * as products from "../data/products.json";
import {createResponse} from "../utils";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  const {pathParameters} = event;
  const {productId} = pathParameters || {};

  const product: Product = products.items.find(({uuid}) => uuid === productId);

  if (!product) {
    return createResponse(404, {
      error: "Not Found",
      message: "Product not found"
    });
  }

  return createResponse(200, {data: product});
}
