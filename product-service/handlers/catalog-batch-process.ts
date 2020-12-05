import {APIGatewayProxyHandler} from "aws-lambda";
import {Infrastructure, NewProduct} from "../../shared/interfaces";
import {InfrastructureImpl} from "../bootstrap";
import {createServerErrorResponse, createResponse} from "../../shared/utils";
import {splitProductsByValidity} from "./utils";

export const catalogBatchProcess: APIGatewayProxyHandler = async (event) => {
    const infrastructure: Infrastructure = new InfrastructureImpl();

    try {
        const {Records} = event as any;
        const products: NewProduct[] = Records.map(({body}) => JSON.parse(body));

        console.log('[PRODUCTS]', products);

        if (products.length < 1) {
            return createResponse(400, "The 'products' param is empty or missing");
        }

        const {valid, invalid} = splitProductsByValidity(products);

        console.log('[VALID]', valid);
        console.log('[INVALID]', invalid);

        await infrastructure.initialize();
        const productsRepository = infrastructure.getProductsRepository();
        const createdProducts = await productsRepository.createBatched(valid);

        console.log('[CREATED]', products);

        return createResponse(200, {
            success: createdProducts,
            error: invalid
        });

    } catch (error) {
        console.log('[ERROR]', error);
        return createServerErrorResponse(error.message);
    } finally {
        await infrastructure.release();
    }
}
