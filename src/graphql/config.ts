import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

export const getGraphQlConfig = (
  configService: ConfigService,
): GqlModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  return {
    playground: true,
    // Generate graphql schema for dev to store it repo
    autoSchemaFile: isProduction ? true : 'src/graphql/schema.gql',
    cors: true,
    introspection: true,
  };
};
