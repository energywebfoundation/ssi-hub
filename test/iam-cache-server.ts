import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "../src/modules/application/application.entity";
import { LoggerModule } from "../src/modules/logger/logger.module";
import { Organization } from "../src/modules/organization/organization.entity";
import { OrganizationModule } from "../src/modules/organization/organization.module";
import { OrganizationService } from "../src/modules/organization/organization.service";
import { Role } from "../src/modules/role/role.entity";
import { SentryModule } from "../src/modules/sentry/sentry.module";

export const bootstrapTestInstance = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'postgres',
        port: Number(5432),
        username: 'postgres',
        password: 'password',
        database: 'dev',
        entities: [Organization, Application, Role],
        logging: ['info']
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      LoggerModule,
      OrganizationModule,
      SentryModule
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  const organizationService = await app.resolve<OrganizationService>(OrganizationService);
  return {
    app,
    organizationService,
  };
}
