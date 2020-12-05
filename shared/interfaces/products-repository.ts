import {Product} from "./product";

export type NewProduct = Omit<Product, 'id'>;

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  create(data: NewProduct): Promise<Product | null>;
  createBatched(data: NewProduct[]): Promise<Product | null>;
}
