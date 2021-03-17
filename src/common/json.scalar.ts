import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

export class JSONObject {}

@Scalar('JSONObject', () => JSONObject)
export class JSONObjectScalar
  implements CustomScalar<Record<string, unknown>, Record<string, unknown>> {
  description = 'JSONObject custom scalar type';

  parseValue(value: Record<string, unknown>): Record<string, unknown> {
    return value; // this is the value a client sends to the server
  }

  serialize(value: Record<string, unknown>): Record<string, unknown> {
    return value; // this is the value the server sends to the client
  }

  parseLiteral(ast: any): Record<string, unknown> {
    if (ast.kind === Kind.OBJECT) {
      return Object.assign({}, ast.value);
    }
    return null;
  }
}
