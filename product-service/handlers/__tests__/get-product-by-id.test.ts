import {getProductById} from "../get-product-by-id";
import {APIGatewayProxyResult} from "aws-lambda";

jest.mock("../../data/products.json", () => ({
  items: [{
    uuid: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    title: "Product title",
    description: "Product description",
    price: 100,
    count: 1
  }]
}));

describe("Test getProductById", () => {
  const context: any = null;
  const callback: any = jest.fn();

  it("Should return the product by ID", async () => {
    expect.assertions(2);

    const product = {
      uuid: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      title: "Product title",
      description: "Product description",
      price: 100,
      count: 1,
    };

    const event: any = {pathParameters: {productId: product.uuid}};
    const response: APIGatewayProxyResult | void = await getProductById(event, context, callback);

    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('body', JSON.stringify({data: product}));
  });

  it("Should return 404 status code when product is not found", async () => {
    expect.assertions(1);

    const event: any = {pathParameters: {productId: "0"}};
    const response: APIGatewayProxyResult | void = await getProductById(event, context, callback);

    expect(response).toHaveProperty('statusCode', 404);
  });
});
