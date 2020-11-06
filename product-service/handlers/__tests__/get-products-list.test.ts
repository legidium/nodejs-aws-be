import {getProductsList} from "../get-products-list";
import {APIGatewayProxyResult} from "aws-lambda";

describe("Test getProductsList", () => {
  const event: any = {};
  const context: any = null;
  const callback: any = jest.fn();

  it("Should return the list of products", async () => {
    expect.assertions(2);
    const response: APIGatewayProxyResult | void = await getProductsList(event, context, callback);
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('body');
  });
});
