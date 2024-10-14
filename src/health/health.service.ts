import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../src/modules/drizzle/schema'; // Import your database schema

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>,
  ) {}

  // Health check function to verify if the database is responsive
  async checkDatabaseHealth(): Promise<boolean> {
    try {
      // Run a simple query to check if the database is alive
      await this.conn.query.users.findMany({ limit: 1 });
      this.logger.log('Database connection is healthy'); 
      return true;
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return false;
    }
  }
}
