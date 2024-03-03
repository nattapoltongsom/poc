import { DatabaseConfig } from "../../config/service";
import { Pool } from "pg";

export class PostgresPool {
  private _pool: Pool;

  constructor(dbConfig: DatabaseConfig, overrideDb?: string) {
    const { host, port = 5432, user, password, database } = dbConfig;

    this._pool = new Pool({
      host,
      database: overrideDb ?? database,
      user,
      password,
      port,
    });
  }

  public getClient(): Pool {
    return this._pool;
  }
  public async findOne(command: string, value?: any[]) {
    const client = await this._pool.connect();
    try {
      const result = await client.query(`${command} limit 1`, value);
      if (result?.rowCount > 0) {
        return result?.rows.shift();
      }
    } catch (e) {
      const message = (e as Error).message;
      throw new Error(message);
    } finally {
      client.release();
    }
  }

  public async query(command: string, value?: any[]) {
    const client = await this._pool.connect();
    try {
      const result = await client.query(command, value);
      return result?.rows;
    } catch (e) {
      const message = (e as Error).message;
      throw new Error(message);
    } finally {
      client.release();
    }
  }
}
