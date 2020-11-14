import {Product} from "./product";

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  create(data: Omit<Product, 'id'>): Promise<Product>;
}
