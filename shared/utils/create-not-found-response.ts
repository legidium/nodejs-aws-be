import {createResponse} from "./create-response";

export const createNotFoundResponse = (message: string) => {
  return createResponse(404, {error: "Not Found", message});
}
