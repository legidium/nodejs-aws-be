import {APIGatewayProxyHandler} from "aws-lambda";
import {Infrastructure, Product} from "../interfaces";
import {InfrastructureImpl} from "../bootstrap";
import {createServerErrorResponse, createResponse} from "../../utils";

export const addProduct: APIGatewayProxyHandler = async (event) => {
  const infrastructure: Infrastructure = new InfrastructureImpl();

  try {
    const {body} = event;
    const data = JSON.parse(body);

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

function validateProduct(data: Omit<Product, 'id'>): boolean {
  const {title, description, price, count} = data;

  // TODO: Add real validation
  return Boolean(
    title &&
    description &&
    (price && price >= 0) &&
    (count && count >= 0)
  );
}
