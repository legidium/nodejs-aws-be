import {Client} from "pg";
import {Infrastructure, ProductsRepository} from "../interfaces";
import {ProductsRepositoryImpl} from "../data/repositories/products-repository-impl";

type EnvironmentVariables = {[key: string]: any};

export class InfrastructureImpl implements Infrastructure {
  private readonly env: EnvironmentVariables;
  private productsRepository: ProductsRepository;
  private db: Client;

  constructor() {
    this.env = InfrastructureImpl.getEnvironmentVariables();
  }

  async initialize(): Promise<void> {
    this.db = await this.getDatabaseConnection();
    this.productsRepository = new ProductsRepositoryImpl(this.db);
  }

  async release(): Promise<void> {
    await this.closeDatabaseConnection();
    this.db = null;
  }

  getProductsRepository(): ProductsRepository {
    return this.productsRepository;
  }

  private static getEnvironmentVariables(): EnvironmentVariables {
    const {
      PG_HOST,
      PG_PORT,
      PG_DATABASE,
      PG_USERNAME,
      PG_PASSWORD
    } = process.env;

    return {
      PG_HOST,
      PG_PORT,
      PG_DATABASE,
      PG_USERNAME,
      PG_PASSWORD
    };
  }

  private async getDatabaseConnection(): Promise<any> {
    const {
      PG_HOST,
      PG_PORT,
      PG_DATABASE,
      PG_USERNAME,
      PG_PASSWORD
    } = this.env;

    const options = {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USERNAME,
      password: PG_PASSWORD,
      connectionTimeoutMillis: 5000,
      ssl: {
        rejectUnauthorized: false
      }
    };

    const client = new Client(options);
    await client.connect();

    return client;
  }

  private async closeDatabaseConnection(): Promise<void> {
    if (this.db) {
      return this.db.end()
    }
    return Promise.resolve();
  }
}
