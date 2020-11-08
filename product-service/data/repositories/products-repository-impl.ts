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

  async create(data: Product): Promise<Product | null> {
    const {title, description, price, count} = data;
    let result;

    try {
      await this.db.query('BEGIN');
      result = await this.db.query(
        `INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *`,
        [
          title,
          description,
          price,
        ]
      );
      const product = result.rows[0] || {};
      await this.db.query(`INSERT INTO stocks(product_id, count) VALUES($1, $2)`, [product.id, count]);
      await this.db.query('COMMIT')

      return {...product, count};

    } catch (error) {
      await this.db.query('ROLLBACK')
      throw error;
    }
  }
}
