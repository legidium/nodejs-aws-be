import {APIGatewayProxyHandler} from "aws-lambda";
import {Infrastructure, Product} from "../../shared/interfaces";
import {InfrastructureImpl} from "../bootstrap";
import {createServerErrorResponse, createResponse} from "../../shared/utils";
import {validateProduct} from "./validators";

export const addProduct: APIGatewayProxyHandler = async (event) => {
  const infrastructure: Infrastructure = new InfrastructureImpl();

  try {
    const {body} = event;
    const data: Product = JSON.parse(body);

    if (!validateProduct(data)) {
      return createResponse(400, "Product contains invalid data");
    }

    await infrastructure.initialize();
    const productsRepository = infrastructure.getProductsRepository();
    const product = await productsRepository.create(data);

    return createResponse(201, product);

  } catch (error) {
    return createServerErrorResponse(error.message);
  } finally {
    await infrastructure.release();
  }
}
