import {ProductsRepository} from "./products-repository";

export interface Infrastructure {
  initialize(): Promise<void>;
  release(): Promise<void>;
  getProductsRepository(): ProductsRepository;
}
