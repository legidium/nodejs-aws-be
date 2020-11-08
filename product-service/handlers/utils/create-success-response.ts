import {createResponse} from "./create-response";

export const createSuccessResponse = (data: any) => {
  return createResponse(200, data);
}
