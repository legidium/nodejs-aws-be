import {Client, QueryResult} from "pg";
import {Product, ProductsRepository} from "../../interfaces";

export class ProductsRepositoryImpl implements ProductsRepository {
  constructor(private db: Client) {}

  async findAll(): Promise<Product[]> {
    const result: QueryResult<Product> = await this.db.query(`
      SELECT p.*, s.count FROM products AS p
      LEFT JOIN stocks AS s ON s.product_id = p.id
    `);
    return result.rows;
  }

  async findById(id: string): Promise<Product | null> {
    const result: QueryResult<Product> = await this.db.query(`
      SELECT p.*, s.count FROM products AS p
      LEFT JOIN stocks AS s ON s.product_id = p.id
      WHERE id=$1
    `, [id]);
    return result.rows ? result.rows[0] : null;
  }
}
