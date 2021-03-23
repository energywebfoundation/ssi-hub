import { Injectable } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

@Injectable()
export class GraphQLParser {
  isFieldRequested({
    field,
    infoObject,
  }: {
    infoObject: GraphQLResolveInfo;
    field: string;
  }) {
    const fields = graphqlFields(infoObject);
    return Boolean(fields[field]);
  }
}
