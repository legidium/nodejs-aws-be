import {NewProduct} from "../../../shared/interfaces";

export const validateProduct = (data: NewProduct): boolean => {
    const {title, description, price, count} = data;

    // TODO: Add real validation
    return Boolean(
        title &&
        description &&
        (price && price >= 0) &&
        (count && count >= 0)
    );
};

export const isProductValid = (data: NewProduct): boolean => validateProduct(data);
