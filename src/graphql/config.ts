import { GqlModuleOptions } from '@nestjs/graphql';

export const getGraphQlConfig = (): GqlModuleOptions => {
  return {
    playground: true,
    autoSchemaFile: 'src/graphql/schema.gql',
    cors: true,
  };
};
