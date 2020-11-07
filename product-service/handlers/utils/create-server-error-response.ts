import {createResponse} from "./create-response";

export const createServerErrorResponse = (message: string) => {
  return createResponse(500, {error: "Internal Server Error", message});
}
