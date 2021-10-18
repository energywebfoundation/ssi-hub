import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Wallet } from 'ethers';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import request from 'supertest';
import { Chance } from 'chance';
import { LoggerModule } from '../logger/logger.module';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Role } from '../role/role.entity';
import * as TestDbCOnfig from '../../../test/config';
import { appConfig } from '../../common/test.utils';
import { OrganizationService } from '../organization/organization.service';
import { Organization } from '../organization/organization.entity';
import { IRoleDefinition } from '@energyweb/iam-contracts';

const chance = new Chance();

describe('ApplicationController', () => {
    const parentOrg = Organization.create({
        name: 'parentOrg',
        namespace: `parentOrg.iam.ewc`,
        owner: Wallet.createRandom().address,
        definition: {
            orgName: 'parentOrg.iam.ewc',
            description: chance.paragraph(),
            websiteUrl: chance.url(),
        },
    });
    let module: TestingModule;
    let appRepo: Repository<Application>;
    let roleRepo: Repository<Role>;
    let queryRunner: QueryRunner;
    let testHttpServer: request.SuperTest<request.Test>;
    let app: INestApplication;

    const mockOrganizationService = {
        getByNamespace: jest.fn(() => parentOrg)
    };

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
                TypeOrmModule.forFeature([Application, Role]),
                LoggerModule,
            ],
            controllers: [ApplicationController],
            providers: [ApplicationService, { provide: OrganizationService, useValue: mockOrganizationService }],
        }).compile();

        app = module.createNestApplication();
        appConfig(app);
        await app.init();

        const dbConnection = module.get(Connection);
        const manager = module.get(EntityManager);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
            'master',
        );
        await queryRunner.startTransaction();
        appRepo = module.get<Repository<Application>>(
            getRepositoryToken(Application),
        );
        roleRepo = module.get<Repository<Role>>(getRepositoryToken(Role));
        testHttpServer = request(app.getHttpServer());
    });

    afterEach(async () => {
        await queryRunner.rollbackTransaction();
        module.close();
    });

    it('getByOwner(), should be able to specify if relations should be included', async () => {
        const owner = Wallet.createRandom().address;
        const app = Application.create({
            name: 'app',
            owner: owner,
            namespace: 'app',
            definition: { appName: 'app' },
            parentOrg,
            roles: [],
        });
        await appRepo.save(app);

        const role = Role.create({
            name: 'role',
            namespace: 'role',
            owner: parentOrg.owner,
            definition: {} as IRoleDefinition,
            parentOrg,
        });
        roleRepo.save(role);

        await testHttpServer
            .get(`/v1/app/owner/${parentOrg.owner}`)
            .expect(200)
            .expect(res => {
                const response: Application[] = res.body;
                expect(response.length).toBe(1);
                expect(response[0].roles.length).toBe(1);
                expect(role).toMatchObject(response[0].roles[0]);
            });

        await testHttpServer
            .get(`/v1/app/owner/${parentOrg.owner}?withRelations=false`)
            .expect(200)
            .expect(res => {
                const response: Application[] = res.body;
                expect(response.length).toBe(1);
                expect(response[0].roles).toBe(undefined);
            });
    });
});