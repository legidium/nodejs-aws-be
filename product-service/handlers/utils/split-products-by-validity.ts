import {NewProduct} from "../../../shared/interfaces";
import {isProductValid} from "../validators";

export type ProductsByValidity = {
  valid: NewProduct[],
  invalid: NewProduct[]
}

export const splitProductsByValidity = (products: NewProduct[]): ProductsByValidity => {
  const valid: NewProduct[] = [];
  const invalid: NewProduct[] = [];

  products.forEach((product) => {
    if (isProductValid(product)) {
      valid.push(product);
    } else {
      invalid.push(product)
    }
  });

  return {valid, invalid};
}
