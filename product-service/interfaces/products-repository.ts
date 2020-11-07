import {Product} from "./product";

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}
