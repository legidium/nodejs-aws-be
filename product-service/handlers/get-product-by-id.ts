import {APIGatewayProxyHandler} from "aws-lambda";
import {Infrastructure, Product} from "../interfaces";
import {InfrastructureImpl} from "../bootstrap";
import {createSuccessResponse, createNotFoundResponse, createServerErrorResponse} from "./utils";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  const infrastructure: Infrastructure = new InfrastructureImpl();

  try {
    await infrastructure.initialize();
    const productsRepository = infrastructure.getProductsRepository();

    const {pathParameters} = event;
    const {productId} = pathParameters || {};
    const product: Product = await productsRepository.findById(productId);

    if (!product) {
      return createNotFoundResponse("Product not found");
    }

    return createSuccessResponse(product);

  } catch (error) {
    return createServerErrorResponse(error.message);
  } finally {
    await infrastructure.release();
  }
}
