import { Resolver, Query } from '@nestjs/graphql';
import { HealthService } from './health.service';

@Resolver()
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  // GraphQL query to check the health of the database
  @Query(() => String)
  async healthCheck(): Promise<string> {
    const isDbHealthy = await this.healthService.checkDatabaseHealth();

    if (isDbHealthy) {
      return 'Database is healthy! 🚀';
    } else {
      return 'Database connection failed. 😢';
    }
  }
}
