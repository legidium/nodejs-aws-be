import {APIGatewayProxyHandler} from "aws-lambda";
import {Infrastructure, Product} from "../interfaces";
import {InfrastructureImpl} from "../bootstrap";
import {createSuccessResponse, createServerErrorResponse} from "../../utils";

export const getProductsList: APIGatewayProxyHandler = async () => {
  const infrastructure: Infrastructure = new InfrastructureImpl();

  try {
    await infrastructure.initialize();
    const productsRepository = infrastructure.getProductsRepository();

    const products: Product[] = await productsRepository.findAll();

    return createSuccessResponse({
      data: products,
      total: products.length
    });

  } catch (error) {
    return createServerErrorResponse(error.message);
  } finally {
    await infrastructure.release();
  }
}
