# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.6.0](https://github.com/energywebfoundation/ssi-hub/compare/v2.5.0...v2.6.0) (2022-05-30)


### Features

* avoid report common error to Sentry ([11bfebc](https://github.com/energywebfoundation/ssi-hub/commit/11bfebcb0e30b188d07c5e8d550eccc668f2f0d9))


### Bug Fixes

* add IPFS CID checking ([b5951d3](https://github.com/energywebfoundation/ssi-hub/commit/b5951d30433b64638d3d4a2b4916fb4d21276f51))
* add JWT token checking ([42ac60c](https://github.com/energywebfoundation/ssi-hub/commit/42ac60c865d70ac940b0d8e436eeea6c7b3e72d5))
* **assets:** fix parsing assets logs ([603af0b](https://github.com/energywebfoundation/ssi-hub/commit/603af0b92f9f6798f2e1a487b8551f67e938ba59))

## [2.5.0](https://github.com/energywebfoundation/ssi-hub/compare/v2.3.0...v2.5.0) (2022-05-17)


### Bug Fixes

* **domains:** root domain depend on chain ([032e725](https://github.com/energywebfoundation/ssi-hub/commit/032e725abc7df0af97a58eaaafebd31b1d75e148))

## [2.4.0](https://github.com/energywebfoundation/ssi-hub/compare/v2.3.0...v2.4.0) (2022-05-10)


### Features

* add `decentralized-web-node` module ([0e89d3a](https://github.com/energywebfoundation/ssi-hub/commit/0e89d3aa0bf2f99b7bd35fcee3cbf0daf40bdfaa))
* add performance tracking of did doc resolution ([167e73f](https://github.com/energywebfoundation/ssi-hub/commit/167e73f2580c032e78371e25b2129af16ad40f31))
* delete DWN module ([adf8080](https://github.com/energywebfoundation/ssi-hub/commit/adf808003221b029a387b24d1a9f7289816ed07d))
* obtain credential matching presentation definition ([eac8b1d](https://github.com/energywebfoundation/ssi-hub/commit/eac8b1d6a37e07300eb26d8459f0ceb75a4fa3a9))


### Bug Fixes

* **helm:** update chart version and rpc url ([f7071a9](https://github.com/energywebfoundation/ssi-hub/commit/f7071a9f9f16a63e52c5b71f3064b0ee4433eeca))

## [2.3.0](https://github.com/energywebfoundation/ssi-hub/compare/v2.2.0...v2.3.0) (2022-03-16)


### Features

* feat ([82ef43e](https://github.com/energywebfoundation/ssi-hub/commit/82ef43eea44eb5a2bc2565053dcf609442a358f3))
* store request claim origin ([074af9f](https://github.com/energywebfoundation/ssi-hub/commit/074af9fdff2851bf357fc115ce442f45b7e68325))


### Bug Fixes

* **ens:** fix name of transferred domain ([8375c9d](https://github.com/energywebfoundation/ssi-hub/commit/8375c9dbc33a4b3f4e9862f4273293dc1b3f2ebc))
* **ens:** solidity hash of subdomain ([4099bce](https://github.com/energywebfoundation/ssi-hub/commit/4099bce0a7542b43b25862e0e75a43bd8079f690))

## [2.2.0](https://github.com/energywebfoundation/ssi-hub/compare/v2.1.0...v2.2.0) (2022-03-09)


### Features

* add ICS production to devops ([cd50cc5](https://github.com/energywebfoundation/ssi-hub/commit/cd50cc5101197e2f19bdcf5b55bdee182bd0755d))
* avoid HTTP exceptions in sentry logging ([431adc4](https://github.com/energywebfoundation/ssi-hub/commit/431adc44e7b6523a5507d02ed5d6759192bd253f))


### Bug Fixes

* **docker-compose.dev:** remove backticks ([196c5f1](https://github.com/energywebfoundation/ssi-hub/commit/196c5f1b37711d57d10d66e0abbee5a902fa5e9f))

## 2.1.0 (2022-02-04)


### Features

* add claim manager address ([9983e49](https://github.com/energywebfoundation/iam-cache-server/commit/9983e49451782d069df81e6f8685cd93d3223a38))
* add sentry perf. monitoring ([be5d651](https://github.com/energywebfoundation/iam-cache-server/commit/be5d651a81d4da4ef04180ccbdd47aeefef959bc))
* add support for chain name in DID ([bb52776](https://github.com/energywebfoundation/iam-cache-server/commit/bb527768ee660c8d863924bef544abf8fb8086de))
* add support for on-chain roles without a request ([99e1e4a](https://github.com/energywebfoundation/iam-cache-server/commit/99e1e4aedde4e6c1fc8f47237068a4960c778ddf))
* add timeout to ens test ([8f95091](https://github.com/energywebfoundation/iam-cache-server/commit/8f950911f1ac2d1e021d9e47ba0d4c03291a1516))
* add typeorm logging ([161cad8](https://github.com/energywebfoundation/iam-cache-server/commit/161cad8c2b18ddc34b04e2fde20043623eec3540))
* adds getbyNamehash and removBynameHash methods ([1c28a5f](https://github.com/energywebfoundation/iam-cache-server/commit/1c28a5f974d504f5958833320d7921eb67b5dd0c))
* adds namehash to tables ([6820b8d](https://github.com/energywebfoundation/iam-cache-server/commit/6820b8dee9d40005c9d93f035e46938e94e5bf1c))
* adds test for roles creation ([ef8f0f6](https://github.com/energywebfoundation/iam-cache-server/commit/ef8f0f61eae3711e58a8a1f47bc8c11ad6e0fd3a))
* adds test for roles creation ([261e0f7](https://github.com/energywebfoundation/iam-cache-server/commit/261e0f734abc76da141f86ef895c75d447bd3765))
* adds unit and integration tests ([83a7acc](https://github.com/energywebfoundation/iam-cache-server/commit/83a7acc0d464e7589123a29be5afd122feba7131))
* adds versioning ([fa3a021](https://github.com/energywebfoundation/iam-cache-server/commit/fa3a021d5347c1011fd72a12f51bb92ebe06a1fa))
* adds versioning ([5392af2](https://github.com/energywebfoundation/iam-cache-server/commit/5392af204cfe196f424c2e1b0e02cd47edcdc92f))
* **app:** migrate from dgraph to postgres ([7be1437](https://github.com/energywebfoundation/iam-cache-server/commit/7be1437c08e75d913a49c1152058ea891766834b))
* **app:** migrate from dgraph to postgres ([2591cf9](https://github.com/energywebfoundation/iam-cache-server/commit/2591cf9bb6bdbf4d6e5efce3367f2db4e453fa17))
* **app:** refactor to use modules ([18b3217](https://github.com/energywebfoundation/iam-cache-server/commit/18b3217b2bd3222841a5cdc3a3940e6887887e47))
* **app:** refactor to use modules ([a6a5a65](https://github.com/energywebfoundation/iam-cache-server/commit/a6a5a659ba78ee51d9f886a3a6b92887af1cedcb))
* **assets:** add assets caching ([443ab5a](https://github.com/energywebfoundation/iam-cache-server/commit/443ab5a9565fd5b0fae66869d345199ab2d6bb6e))
* **assets:** normalized assets events types to lowercase + hyphens ([e52a149](https://github.com/energywebfoundation/iam-cache-server/commit/e52a14974da5f4e8ac18fbc6ba5bd1fed2d08f09))
* **auth.module:** add v1 to excluded endpoints ([#165](https://github.com/energywebfoundation/iam-cache-server/issues/165)) ([f501570](https://github.com/energywebfoundation/iam-cache-server/commit/f501570c83e5eb7c930ac39a2a9a5d30e873d170))
* **auth:** accept refresh token in query params ([fbf4918](https://github.com/energywebfoundation/iam-cache-server/commit/fbf4918b6773961186b9906668b6a3f1544501dd))
* **auth:** accept refresh token in query params ([5fff3c8](https://github.com/energywebfoundation/iam-cache-server/commit/5fff3c825dd6b6875dd1b55cae9ccc940926002a))
* **auth:** add endpoint for checking auth status ([cd7e19c](https://github.com/energywebfoundation/iam-cache-server/commit/cd7e19cb7e14b6443de3cc82ddd950d78eb98f53))
* **auth:** add option to disable auth ([40119fc](https://github.com/energywebfoundation/iam-cache-server/commit/40119fc42e3035687d7d81f84865549d18baa80e))
* **auth:** add option to disable auth ([6432c7c](https://github.com/energywebfoundation/iam-cache-server/commit/6432c7cd30f009c73ace19ca2912aabbf3aaa72e))
* **auth:** add refresh token cookie expiration time ([b399270](https://github.com/energywebfoundation/iam-cache-server/commit/b3992709c3bfde3f0eadba6dc9b7775617c92959))
* **auth:** add refresh token implementation ([ac375a6](https://github.com/energywebfoundation/iam-cache-server/commit/ac375a626d1416e4d9771239f8fc53550d328a4e))
* **auth:** add refresh token implementation ([aa22c03](https://github.com/energywebfoundation/iam-cache-server/commit/aa22c03a22093322af93014880d3f72d9d79dc84))
* **auth:** change error when origins not matched ([d109990](https://github.com/energywebfoundation/iam-cache-server/commit/d109990f8457e7ec115548f4b98ba064c2f09191))
* **Auth:** disable auth check when ENABLE_AUTH is false ([d127bd3](https://github.com/energywebfoundation/iam-cache-server/commit/d127bd368a7e0548e306cb60815bee2ffbecc4c6))
* **auth:** protect deleting endpoint ([3937667](https://github.com/energywebfoundation/iam-cache-server/commit/39376679dcad5fb701aeee54fbb2b33bcba2474f))
* **auth:** protect deleting endpoint ([a819447](https://github.com/energywebfoundation/iam-cache-server/commit/a819447f2aa87022beb443279580d644c89c32e8))
* **cache_serevr.test:** setting deployment with docker-compose.dev.yml file ([e812d64](https://github.com/energywebfoundation/iam-cache-server/commit/e812d6457f5b44f4338b5c1b1b1dc8aacf8b0f1e))
* **cache_server_tester:** Setting Github actions to run automated tests on prod environment ([1689ba0](https://github.com/energywebfoundation/iam-cache-server/commit/1689ba02c4576e4be632725706a97ed9c93738b4))
* **cache_server.test:** Running docker build without docker-compose.dev.yml ([0f17a04](https://github.com/energywebfoundation/iam-cache-server/commit/0f17a047208cebf59f08a6e0d9b3de1e68f114ab))
* **Cache_server.test:** updating docker commands on build & run ([73aa802](https://github.com/energywebfoundation/iam-cache-server/commit/73aa8026aa40b53801a379de3917d8922b2fc850))
* **cache_server.test:** using github env values in GHA ([fe598dd](https://github.com/energywebfoundation/iam-cache-server/commit/fe598dd68acbeff629f3f2631a9946b1d0d2d6e6))
* **claim.dto:** requiring stringNumber claimTypeVersion ([f7061fb](https://github.com/energywebfoundation/iam-cache-server/commit/f7061fb7364171509f97573c1c496bdae2f9fa07))
* **claim:** add enrolment preconditions ([4f3a991](https://github.com/energywebfoundation/iam-cache-server/commit/4f3a9910b64a4c6fbb51999c8e37e8f69d24c531))
* **claim:** add enrolment preconditions ([89a1408](https://github.com/energywebfoundation/iam-cache-server/commit/89a140808218da80dee7b4178ceb1031f02927bf))
* **claim:** add rejection reason ([1b3d59b](https://github.com/energywebfoundation/iam-cache-server/commit/1b3d59b0b23feb46ea83d0bf044bdcd6df2d97f3))
* **claim:** authorize claim access ([afcc18d](https://github.com/energywebfoundation/iam-cache-server/commit/afcc18d2c0a018b028903cfcc15604d5e092ca31))
* **claim:** extract subject from token ([85205ea](https://github.com/energywebfoundation/iam-cache-server/commit/85205ea00794c12857c50b02384333c1e1f3500a))
* **claim:** get by subjects endpoint ([bf984e7](https://github.com/energywebfoundation/iam-cache-server/commit/bf984e72ea333e57b775625afbd29da620e4222f))
* **claim:** persists and retrieve issued tokens ([58d30d6](https://github.com/energywebfoundation/iam-cache-server/commit/58d30d681238a22d40baff9cb4dfc1d8faf9ac3f))
* **claim:** remove unused DID param in claim request path ([6471550](https://github.com/energywebfoundation/iam-cache-server/commit/647155047045c0caf938159f86487cd122d96d6d))
* **claims:** add claim registration types ([72d190c](https://github.com/energywebfoundation/iam-cache-server/commit/72d190c32048a7a3e841e429803e8c6b3acfc98e))
* **claim:** save issued claim without request ([#195](https://github.com/energywebfoundation/iam-cache-server/issues/195)) ([85d6067](https://github.com/energywebfoundation/iam-cache-server/commit/85d6067fa41dd823f9489c886d48a530d0032c91))
* **claims:** claim request rejection and issuance sent via https ([9aea15c](https://github.com/energywebfoundation/iam-cache-server/commit/9aea15cdd41bc02f708a7825c3c3884578b09ccd))
* **claims:** claimId in claim nats notifications ([c5d9e73](https://github.com/energywebfoundation/iam-cache-server/commit/c5d9e739c4b9e09ceaa70703f52c4ebfcc847f01))
* **claims:** claimId in claim nats notifications ([785772c](https://github.com/energywebfoundation/iam-cache-server/commit/785772c20ab0e484bdf263ba346aa1cc184795ac))
* **claims:** ignore claimIssuer ([4e10372](https://github.com/energywebfoundation/iam-cache-server/commit/4e10372cbedf2e68d191e5268606a6a8b32ef8fd))
* **claims:** incomming requests logs in claims controller ([537cc8a](https://github.com/energywebfoundation/iam-cache-server/commit/537cc8a97964a44308d56dea485e4114f5171bda))
* **claims:** migrate claim subject ([fcdb744](https://github.com/energywebfoundation/iam-cache-server/commit/fcdb744802684851350e1bb7e052d9a2f6e781f5))
* **claims:** nats notification only from cache server and without details ([32e958e](https://github.com/energywebfoundation/iam-cache-server/commit/32e958eec9fc29e02f289c26073053eb684fccca))
* **claims:** optimize filter roles by namespace ([b2dcaa5](https://github.com/energywebfoundation/iam-cache-server/commit/b2dcaa501f0e09abd0f4047ffbc17d3790154b88))
* **claims:** persist onchain proof ([b2f95b3](https://github.com/energywebfoundation/iam-cache-server/commit/b2f95b361684b34620a77920125cac2f28d47725))
* **claims:** persist subject agreement ([94e1b33](https://github.com/energywebfoundation/iam-cache-server/commit/94e1b338facfba9cf6ddd15afb26a4c24b17ad99))
* **claims:** retrieve roles by issuer ICS-86 ([cc6bb30](https://github.com/energywebfoundation/iam-cache-server/commit/cc6bb3070cc228531f6edc42f032cebadae69417))
* cleanup ([b76b31a](https://github.com/energywebfoundation/iam-cache-server/commit/b76b31aaec2c9ec54807e4bae59fb02d48818258))
* **cookies:** add option to store token in cookies ([90a18c5](https://github.com/energywebfoundation/iam-cache-server/commit/90a18c5539a25894d710cf7ebae7da9d002192e6))
* **cookies:** add option to store token in cookies ([3ce077e](https://github.com/energywebfoundation/iam-cache-server/commit/3ce077e69116c3111015f091df9ef7abfeffb9e9))
* **database:** enable connection pooling ([c6800ff](https://github.com/energywebfoundation/iam-cache-server/commit/c6800ffd19a149ab25111011487f6826307ecb7f))
* **deployment:** add travis deployment for production ([b985a4a](https://github.com/energywebfoundation/iam-cache-server/commit/b985a4a2defbcb3615c9daa9ef2947a5058b7b26))
* **deps:** bump `ew-did-registry` version to latest ([68e16eb](https://github.com/energywebfoundation/iam-cache-server/commit/68e16ebb5d27d8fd8c21b0ba7623a0c13c9b22ea))
* **deps:** bump `iam-contracts` and `ethers` version to latest ([7367fdc](https://github.com/energywebfoundation/iam-cache-server/commit/7367fdcf91eb703fad819469d2b33ef18357254a))
* **deps:** bump `iam-contracts` version to latest ([d35baa6](https://github.com/energywebfoundation/iam-cache-server/commit/d35baa6fb0de28d72371c689d52ddaf704ad54f8))
* **deps:** bump `iam-contracts` version to latest ([1c684b2](https://github.com/energywebfoundation/iam-cache-server/commit/1c684b2a620d8cf53135e605c9f541c489358ea4))
* **deps:** bump `passport-did-auth` and `iam-contracts` versions to latest ([d2e812e](https://github.com/energywebfoundation/iam-cache-server/commit/d2e812ef383aa631a774bddb8aa8ac70ee1db2b5))
* **deps:** bump passport-did-auth version to latest canary ([3768ffe](https://github.com/energywebfoundation/iam-cache-server/commit/3768ffeab2b2c3c69749675eb1c39871f1773f47))
* **did.controller:** upgrade old ethr DID with chainInfo ([9970116](https://github.com/energywebfoundation/iam-cache-server/commit/99701164a36c8fdac96b60b80e51b4abe6a43c4c))
* **did:** add universal resolver call for did document ([6ecd28b](https://github.com/energywebfoundation/iam-cache-server/commit/6ecd28bd6dd38cba4661f4e228b3d27272d60755))
* **did:** add universal resolver call for did document ([ea448bb](https://github.com/energywebfoundation/iam-cache-server/commit/ea448bb9b160ccba72723ff7d6a9eaa8daff77d9))
* **did:** add universal resolver docker deploy config ([7643cc2](https://github.com/energywebfoundation/iam-cache-server/commit/7643cc270ae08d701d8a58aa89cedcddd9376313))
* **did:** add universal resolver docker deploy config ([704d213](https://github.com/energywebfoundation/iam-cache-server/commit/704d213e292f609cb116b0e21ea29e174b6d6fd5))
* **did:** bad request on malformed did ([68d1a64](https://github.com/energywebfoundation/iam-cache-server/commit/68d1a6442d20bb78fc1bf1338bf792a8aa750abb))
* **DIDContact:** adds DIDContactModel ([f331ef2](https://github.com/energywebfoundation/iam-cache-server/commit/f331ef2f61f203484122fb36e2a78baea30c28ef))
* **DIDContact:** adds e2e test for POST endpoint ([a3485d3](https://github.com/energywebfoundation/iam-cache-server/commit/a3485d35ccb083087fb20a2e78cf2c116076a137))
* **DIDContact:** generate docs ([4433de1](https://github.com/energywebfoundation/iam-cache-server/commit/4433de1404d90e0ad409ee92381a012e279eb551))
* **DIDContact:** implements DELETE endpoint ([1877b46](https://github.com/energywebfoundation/iam-cache-server/commit/1877b46843011c90909470d483bcaf9abd62be44))
* **DIDContact:** implements GET  endpoint ([17ef9ea](https://github.com/energywebfoundation/iam-cache-server/commit/17ef9ead83fb6fb2204fb3ae9dfa3020a84ed4cb))
* **did:** default chain for ethr did ([9067b5e](https://github.com/energywebfoundation/iam-cache-server/commit/9067b5e875ac0b6260c4453aa6bf099344dee419))
* **DIDProcessor:** handle error messages with bull error handler ([770d412](https://github.com/energywebfoundation/iam-cache-server/commit/770d4127ea1608aa41878d6c36f532c6f8e3877d))
* **DIDProcessor:** prevent app from exiting when a fatal error is encounterd ([80262f4](https://github.com/energywebfoundation/iam-cache-server/commit/80262f46a455c5eacb8435eaf0d382864d09c9a5))
* **DID:** refresh DID document from chain ([ed5783c](https://github.com/energywebfoundation/iam-cache-server/commit/ed5783c3474622da0235bf6ba87f9c11e1075b52))
* **did:** transform did pipe ([259b5b1](https://github.com/energywebfoundation/iam-cache-server/commit/259b5b16164c6c8e51774a8fc55ab790cf3f9098))
* disable connection pooling ([0a7d40d](https://github.com/energywebfoundation/iam-cache-server/commit/0a7d40d0a0413016a54edf878c3894761cb3177d))
* **docker-compose:** setting env variables ([03f8bbf](https://github.com/energywebfoundation/iam-cache-server/commit/03f8bbf76a241e112c6d73c126ab3e73baa028f9))
* **e2e test:** running basic test ([70e9d37](https://github.com/energywebfoundation/iam-cache-server/commit/70e9d3707f2c4676904af40f6cf521433d6790f0))
* e2e tests for org controller ([2e00d7a](https://github.com/energywebfoundation/iam-cache-server/commit/2e00d7a6f46bcb343f1a72377cbd88c7b4c49c70))
* emit offer accept reject cancel ([c20d0b4](https://github.com/energywebfoundation/iam-cache-server/commit/c20d0b469ed8ec07200ec94cf03b017678525a38))
* **ens.service:** use RoleDefinitionReader from [@ew-iam](https://github.com/ew-iam) ([31d187f](https://github.com/energywebfoundation/iam-cache-server/commit/31d187f383ffff97cf3e8ddd8766a5db2dd20c9e))
* **env_file.dist:** setting AWS ECR variables ([a2b4963](https://github.com/energywebfoundation/iam-cache-server/commit/a2b4963a7ecedd52d4555722cc1b200ab5ea5f3e))
* get owned domains with relations ([18dcde4](https://github.com/energywebfoundation/iam-cache-server/commit/18dcde4c394104b257d19fcd69e8f9a2f6e34182))
* **Github Workflow:** initial draft PR: ([b40f54a](https://github.com/energywebfoundation/iam-cache-server/commit/b40f54a5785b58e99891dc98287dc8928973c6b0))
* **graphQL:** add graphql api ([97a89ed](https://github.com/energywebfoundation/iam-cache-server/commit/97a89eddc8072eafa65340168098a57b5b3608d6))
* **graphQL:** add graphql api ([3e6ded9](https://github.com/energywebfoundation/iam-cache-server/commit/3e6ded9911dccf350a9ee4ca8b519f5b52f7d613))
* **graphql:** disable graphql ([#207](https://github.com/energywebfoundation/iam-cache-server/issues/207)) ([394d65f](https://github.com/energywebfoundation/iam-cache-server/commit/394d65f120d2dc69386eb6f1b7684ea0f4505d1a))
* **healthcheck:** add initial healthcheck ([5a1d45d](https://github.com/energywebfoundation/iam-cache-server/commit/5a1d45ddafe587d2037a0f34811559811fd46c9f))
* implement PR feedback ([9172cef](https://github.com/energywebfoundation/iam-cache-server/commit/9172cefae12ff1f54d16b74ef25e348f2cdc5822))
* implement PR feedback ([43d40a5](https://github.com/energywebfoundation/iam-cache-server/commit/43d40a5df3376bd1d009762a5be12583c3e3d8d8))
* implements PR feedback ([43ffee3](https://github.com/energywebfoundation/iam-cache-server/commit/43ffee35e66463fcf0ee51da8370f95bfd4e8d98))
* improve logging visibility into app sync failure ([d4ffcb5](https://github.com/energywebfoundation/iam-cache-server/commit/d4ffcb5d83349c0d2c75483eebb8a0d2d71e7222))
* improve sentry tracing ([35543fb](https://github.com/energywebfoundation/iam-cache-server/commit/35543fb311d45c6ffb77b5656b4580e4f09e82e8))
* initial db test setup ([1217e3b](https://github.com/energywebfoundation/iam-cache-server/commit/1217e3ba8fb203b284ec2bda56df1293758882e7))
* initial scaffold for staking pool service ([a8655d0](https://github.com/energywebfoundation/iam-cache-server/commit/a8655d06145ddd043650f1d1f964f3f251cec047))
* **logging:** add loggin to files and sentry integration ([6b1f8aa](https://github.com/energywebfoundation/iam-cache-server/commit/6b1f8aab6a7f638aab72f42059363fa1666b679c))
* **logging:** add loggin to files and sentry integration ([7c5a9c9](https://github.com/energywebfoundation/iam-cache-server/commit/7c5a9c96a4b61f62026c6ff85aac675fe394fb81))
* **login.strategy:** add optional numBlocksBack config ([4071310](https://github.com/energywebfoundation/iam-cache-server/commit/40713109974a8ffa3fd61332999166f13d2a57e9))
* **logs:** enable logs in console to display in argo ([0108f7b](https://github.com/energywebfoundation/iam-cache-server/commit/0108f7bd2323f6b053f1b8fb0287ad81dda43a21))
* **logs:** partial redaction of DIDs ([60644a7](https://github.com/energywebfoundation/iam-cache-server/commit/60644a733fef8563caf56357aeeb41c37d829fa6))
* **logs:** striping sensitive data from logs ([#225](https://github.com/energywebfoundation/iam-cache-server/issues/225)) ([14d7583](https://github.com/energywebfoundation/iam-cache-server/commit/14d7583baaa644f612fc8162b60d1bc9dc02513f))
* migrating existing did to have chain id ([18a8c94](https://github.com/energywebfoundation/iam-cache-server/commit/18a8c94d740ebc1286fcfda3c635a8d7bc1a5b97))
* move event listener to staking service ([0a50068](https://github.com/energywebfoundation/iam-cache-server/commit/0a500680b991bd282a06c6fb108f7ce710d08ecd))
* move event listener to staking service ([7028de6](https://github.com/energywebfoundation/iam-cache-server/commit/7028de6df3b8c28d313b810ebd2036c4a8c0a280))
* move event listener to staking service ([7c65722](https://github.com/energywebfoundation/iam-cache-server/commit/7c6572260d830a776e466db17af394b1808d5a9b))
* **nats:** event type property in body ([6623199](https://github.com/energywebfoundation/iam-cache-server/commit/66231998f1d66b283b87f19bc9c1b2369a177bc9))
* **nats:** removed unnecessary fields from messages ([b16417f](https://github.com/energywebfoundation/iam-cache-server/commit/b16417fbe2a4e2e6296ef5a074f6bb3a5b3ba35d))
* **nats:** use queues for processing nats messages ([22de166](https://github.com/energywebfoundation/iam-cache-server/commit/22de1661a59231fc4b95383087551a6b62fe5a79))
* **owner:** return subOrgs from org owner endpoint ([9a0f406](https://github.com/energywebfoundation/iam-cache-server/commit/9a0f40610343488a36bca440e0640b4ce6dcede3))
* **owner:** return subOrgs from org owner endpoint ([9cb29d1](https://github.com/energywebfoundation/iam-cache-server/commit/9cb29d131b67dc27b53171799a75d89d84fa688e))
* publish offer cancel reject accept ([991d9fc](https://github.com/energywebfoundation/iam-cache-server/commit/991d9fc243775ecc4cfea8ce09f15db348016069))
* removes and prevents duplicate namespaces ([f055584](https://github.com/energywebfoundation/iam-cache-server/commit/f0555840056d4adb43fe6ed9d68e6040d59d2cda))
* removes claimsIssuer Column ([bc95f01](https://github.com/energywebfoundation/iam-cache-server/commit/bc95f017963be9067b34b89286973ce901905c2a))
* **role:** add endpoint to fetch multiple roles definition ([edb07f0](https://github.com/energywebfoundation/iam-cache-server/commit/edb07f061da31bd8bc4a2967951fc8b90133ee5c))
* **roleDefinition:** add validation properties to fields ([33a501d](https://github.com/energywebfoundation/iam-cache-server/commit/33a501dd9f5ce28cd07037cd8ed1755bbcb69138))
* **roleDefinition:** add validation properties to fields ([51bbf68](https://github.com/energywebfoundation/iam-cache-server/commit/51bbf682d607bc7c9144c45cd158dd16b0ee10cd))
* **role:** get all ([e50ac18](https://github.com/energywebfoundation/iam-cache-server/commit/e50ac1801ad58d9f6e1740b329f63f991c7847fa))
* saves staking pool information ([ed642fb](https://github.com/energywebfoundation/iam-cache-server/commit/ed642fbc22797e4750c25df36f3e2dd52bc1c46e))
* setup postgres connection pooling ([f5d08d5](https://github.com/energywebfoundation/iam-cache-server/commit/f5d08d5bb660a692846b613724ba40d6878a4e3b))
* **subOrgs:** get orgs subOrgs hierarchy ([d6c003b](https://github.com/energywebfoundation/iam-cache-server/commit/d6c003b23c38cf839066328e1d03e578b3ca872e))
* **subOrgs:** get orgs subOrgs hierarchy ([511131c](https://github.com/energywebfoundation/iam-cache-server/commit/511131c3d146c5211d11b062f4883832b7080151))
* tests for app creation ([745f70a](https://github.com/energywebfoundation/iam-cache-server/commit/745f70a895df4e79119aa3d067543d193556dd09))
* tests for org creation ([1fce8b6](https://github.com/energywebfoundation/iam-cache-server/commit/1fce8b6ece4a96afe4b5534e6e531f341e0d7f37))
* update .env.ci ([cf08c70](https://github.com/energywebfoundation/iam-cache-server/commit/cf08c70d6ed7aff0bf6d28d548017f543f3dca98))
* update deprecated transform params ([787c997](https://github.com/energywebfoundation/iam-cache-server/commit/787c997adb77697b6da18e2ee52af14b2a8ccc0b))
* update env values for tests ([23ba8ea](https://github.com/energywebfoundation/iam-cache-server/commit/23ba8ea07af5d6da71a9e39314518b0a86dc6ce5))
* update GHA deployment workflow ([2bac4d7](https://github.com/energywebfoundation/iam-cache-server/commit/2bac4d72a3956dab838be15e2bda789adc653c32))
* update identity manager ([1985e8c](https://github.com/energywebfoundation/iam-cache-server/commit/1985e8c804003e52dcd2cb797bead31bc7c98cb7))
* update method params with namehash value ([8a735fd](https://github.com/energywebfoundation/iam-cache-server/commit/8a735fdb0ae068e0d68398b2fd94ce04fcd347d5))
* update staging iam cache server ([3cdde23](https://github.com/energywebfoundation/iam-cache-server/commit/3cdde23b5eda74ffaf1cdf38fc59e8d758e20e6f))
* update test workflow with env variables ([eef1b54](https://github.com/energywebfoundation/iam-cache-server/commit/eef1b547f541dcc801da4902583c077503929396))
* versioning for org controller ([0246275](https://github.com/energywebfoundation/iam-cache-server/commit/02462756b0e1e210dc7fc09d7c246f78e2f64dd7))


### Bug Fixes

* add type when saving asset ([cf4c830](https://github.com/energywebfoundation/iam-cache-server/commit/cf4c830d7fd0159850396b945521575fc90fac37))
* **app:** fix folder duplication and naming ([db28c71](https://github.com/energywebfoundation/iam-cache-server/commit/db28c71ebc3b9070429c8160e65ba9675bb33865))
* **app:** fix folder duplication and naming ([f37881a](https://github.com/energywebfoundation/iam-cache-server/commit/f37881a7b1cd41415a6695b99190119874d5aac3))
* **asset-service:** bind(this) to fix logger undefined ([5ddd91d](https://github.com/energywebfoundation/iam-cache-server/commit/5ddd91dafd411e104102062a4d15386dc7d9e48c))
* **assets.controller.getByID:** check for null asset ([99baa52](https://github.com/energywebfoundation/iam-cache-server/commit/99baa528753eca9658208b7d128c62e9104e6535))
* **assets:** query accepted and created assets ([1dc097f](https://github.com/energywebfoundation/iam-cache-server/commit/1dc097fc112db236892ab9d329c7df3112e87e5e))
* **assets:** rollback asset event type to uppercase ([f1039fa](https://github.com/energywebfoundation/iam-cache-server/commit/f1039fa3af596d90d0c203cf3cde7799a56b7079))
* **assets:** update asset manager ([8b29f7f](https://github.com/energywebfoundation/iam-cache-server/commit/8b29f7facc9d89da40a237f2d290d6a3d4eafbf5))
* **auth:** login startegy unknown ([a37bcf4](https://github.com/energywebfoundation/iam-cache-server/commit/a37bcf475160f1272bf655ec92362de7ba5edab6))
* **auth:** login startegy unknown ([6943cbb](https://github.com/energywebfoundation/iam-cache-server/commit/6943cbb39a07196bea2a4fd12889b86a7517cf4f))
* **build:** fresh start ethers error ([e5bad9a](https://github.com/energywebfoundation/iam-cache-server/commit/e5bad9ab6693c13376ee55cfd5d582cc1e1af012))
* **build:** fresh start ethers error ([f5921d8](https://github.com/energywebfoundation/iam-cache-server/commit/f5921d8622ecd9ef34dcadc82783388189705d2f))
* **cache_server.test:** putting back usage of docker-compose.dev.yml ([cee5075](https://github.com/energywebfoundation/iam-cache-server/commit/cee50754506544accbbf26105c31eddb0ead2c36))
* **Cache_server.test:** update ([4992566](https://github.com/energywebfoundation/iam-cache-server/commit/4992566dc21a948c72031b6d5f3c68179155fc78))
* **cache_server.test:** updating docker build command ([e7391f1](https://github.com/energywebfoundation/iam-cache-server/commit/e7391f1cfb0a61e744e722e9c9ed2f2f84619cb7))
* **cache_server:** setting env_file for docker-compose ([76a4ad5](https://github.com/energywebfoundation/iam-cache-server/commit/76a4ad55c2254687abe724a2a67948ffaeccad7f))
* **cache_server:** setting env_file for docker-compose ([d5494f6](https://github.com/energywebfoundation/iam-cache-server/commit/d5494f6c06ad6295fef3d4a4735a2298736862d3))
* **cache_server:** setting env_file for docker-compose ([7bf3d9a](https://github.com/energywebfoundation/iam-cache-server/commit/7bf3d9ae73435725f6090bda3cc6413f6dae8ef5))
* change to using a more similar library for pruning ([cff2d36](https://github.com/energywebfoundation/iam-cache-server/commit/cff2d369f7026c3044918113871d4e6e1f882fca))
* claim id from claim data ([a54406c](https://github.com/energywebfoundation/iam-cache-server/commit/a54406cddb0d1d9421b488f8be9bdbc2011db358))
* **claim.dto:** accomodating number and string claimTypeVersion ([889448f](https://github.com/energywebfoundation/iam-cache-server/commit/889448f5f3b566cf24b59f720f1777854c8c5aff))
* **claim.dto:** add registrationTypes and additional tests ([6225af1](https://github.com/energywebfoundation/iam-cache-server/commit/6225af185bb20210395bcd9979682be6fd023720))
* **claim.dto:** add subjectAgreement ([32b7771](https://github.com/energywebfoundation/iam-cache-server/commit/32b7771fccf84a2333fcd14876f71b1b9e66daf9))
* **claim:** add claim/request route backwards compatibility ([edfea8e](https://github.com/energywebfoundation/iam-cache-server/commit/edfea8e9b0dbc36a4339a5b11f6fb923e1057ac6))
* **claim:** dont filter by empty roles ([8d3a501](https://github.com/energywebfoundation/iam-cache-server/commit/8d3a501a165edff852d3aa6c20fe3e95dbff6dc5))
* **claim:** fix mismatching param name ([762bb2a](https://github.com/energywebfoundation/iam-cache-server/commit/762bb2aa8da9e9bfc05c66e6105934ab896128f3))
* **claim:** make issuedToken optional ([72bec0e](https://github.com/energywebfoundation/iam-cache-server/commit/72bec0e654ab384d02814862c172e611d68712fa))
* **claim:** only verify issuer signature for issueToken ([c866acb](https://github.com/energywebfoundation/iam-cache-server/commit/c866acbe804b1f32520961e0dbf8f178279a87b9))
* **claim:** rename parentNamespace ([90a7b09](https://github.com/energywebfoundation/iam-cache-server/commit/90a7b09e0b6799eefd47431a6369def7eddfe604))
* **claim:** rename query param ([aa35b3d](https://github.com/energywebfoundation/iam-cache-server/commit/aa35b3d14d8536af70113bd95859674f6059d6a4))
* **claims:** add onChainProof in claim issue dto ([2f5f422](https://github.com/energywebfoundation/iam-cache-server/commit/2f5f4226ccf80abd40c1ea6673b9df96e1357d62))
* **claims:** changes in events names ([cceb677](https://github.com/energywebfoundation/iam-cache-server/commit/cceb677681e384974bef379ce533ffd6c3547eb5))
* **claims:** check owned and offered assets before request claims ([e008eed](https://github.com/energywebfoundation/iam-cache-server/commit/e008eed2018757ac0ca6a8e9da05747eabe63ecf))
* **claims:** ensure only one event is propagated to each notified DID ([b1a2d04](https://github.com/energywebfoundation/iam-cache-server/commit/b1a2d04727d5d841ee00bb17948bdb72bf1f9b0b))
* **claims:** further naming fixes ([9db2e24](https://github.com/energywebfoundation/iam-cache-server/commit/9db2e24cca1c322da920f9bb3d2c9bb8172d52c2))
* **claims:** issue claim on-chain fixed no issuedToken required ([9d999b3](https://github.com/energywebfoundation/iam-cache-server/commit/9d999b373da9f3e2c3fedd205b9ff142edacc659))
* **claims:** typos fixes ([06fbe17](https://github.com/energywebfoundation/iam-cache-server/commit/06fbe170f24a0fc82630e33ebd333b34df66a117))
* **claims:** typos fixes ([825ac4a](https://github.com/energywebfoundation/iam-cache-server/commit/825ac4a7cb71e424afe84b46e882a2edc1dc3745))
* **claim:** verify signature of issuer in request ([4fecde8](https://github.com/energywebfoundation/iam-cache-server/commit/4fecde8e35b8de91b3ca20c09d7620f8a61a4775))
* **claim:** verify the permissions of the issuer of the role ([c1a049b](https://github.com/energywebfoundation/iam-cache-server/commit/c1a049b5ddc96b087b221cef9d8720639dbcae36))
* **cookies:** samesite none cookie issue ([9e739a1](https://github.com/energywebfoundation/iam-cache-server/commit/9e739a1cc5c2d7c2976b30f3e9a9d7d90f611978))
* **cookies:** samesite none cookie issue ([4fb6a1b](https://github.com/energywebfoundation/iam-cache-server/commit/4fb6a1b02cbedeb28db8bbce8dd5a78ce7a0d980))
* **core:** default missing claimTypeVersion to '1' ([6e2083a](https://github.com/energywebfoundation/iam-cache-server/commit/6e2083a533779373a010327ba53904f9908c287d))
* correct event saved logs ([9bec9f6](https://github.com/energywebfoundation/iam-cache-server/commit/9bec9f616f120eb1f6edf41d0f540cfec54fca83))
* **db:** fix migration path config ([2dfd4cd](https://github.com/energywebfoundation/iam-cache-server/commit/2dfd4cda3007e66a37816b7dd5e513bb8ef316e8))
* **db:** fix migration path config ([e636932](https://github.com/energywebfoundation/iam-cache-server/commit/e636932fec79701d896a955985770cc2640597e9))
* **deploy:** fix deploy script ([04d5d19](https://github.com/energywebfoundation/iam-cache-server/commit/04d5d19800b47e7b4554a7d202e24df427936255))
* **deploy:** fix deploy script ([5704bd9](https://github.com/energywebfoundation/iam-cache-server/commit/5704bd9f3051b47a69de5fce1fad387012abc90e))
* **deploy:** fix package.json not synced with lock file ([1b89ca7](https://github.com/energywebfoundation/iam-cache-server/commit/1b89ca7c8e277a680c459b18d7b1b7c64abc456d))
* **deploy:** fix package.json not synced with lock file ([c59f78d](https://github.com/energywebfoundation/iam-cache-server/commit/c59f78d36e242775fa8dac1f5f1a20a17f66120e))
* **deploy:** fix scp port number env ([fa41d81](https://github.com/energywebfoundation/iam-cache-server/commit/fa41d818a806a1e9366b0d3bf59564fa54c1d1eb))
* **deploy:** fix scp port number env ([628ec86](https://github.com/energywebfoundation/iam-cache-server/commit/628ec86367a958a67907ebb30fa21cace19b1205))
* **deps:** update package-lock with correct versions ([175b5cd](https://github.com/energywebfoundation/iam-cache-server/commit/175b5cdad35c752484edf7292a62128648525c4c))
* **dgraph:** fix dgraph migrations typo ([a47f3bc](https://github.com/energywebfoundation/iam-cache-server/commit/a47f3bc309f6e3fce57d81429d253ca8c73df943))
* **dgraph:** fix dgraph migrations typo ([2f372ec](https://github.com/energywebfoundation/iam-cache-server/commit/2f372ecc2dcf75d12ab000abbceb3ac5f83491b4))
* **did caching:** improving DID Document retrieval ([d4e8ae5](https://github.com/energywebfoundation/iam-cache-server/commit/d4e8ae5f058ac1d1359aa0a85621744baf71590d))
* **did.controller:** remove includeClaims param as not respected ([b8c7469](https://github.com/energywebfoundation/iam-cache-server/commit/b8c7469a6c42573fbc51f100dfca94613b21586c))
* **did.controller:** should be retrieving by did, not id ([7aca23d](https://github.com/energywebfoundation/iam-cache-server/commit/7aca23dc04816d76ef9aa7b803216d01dfc516f6))
* **did.service:** await resolver.readFromBlock in getAllLogs ([4de329e](https://github.com/energywebfoundation/iam-cache-server/commit/4de329e002db12b511417aa2e1768d7c7a8e2325))
* **did.service:** fix parse parse logs ([5dd2337](https://github.com/energywebfoundation/iam-cache-server/commit/5dd2337e7dfde3a48b4cde1d742009d49e64758c))
* **did.service:** handle trailing slash in UNIVERSAL_RESOLVER_CONFIG ([498f9f7](https://github.com/energywebfoundation/iam-cache-server/commit/498f9f775f97bae118f02923eddf75903f2fe8e7))
* **did.service:** only return IDIDDoc when getByID ([154d8b2](https://github.com/energywebfoundation/iam-cache-server/commit/154d8b2fbfb4f4cf72844b8f7f1e24a2285d4651))
* **did.service:** update ew-did-registry packages to fix parallel resolver read ([1c0dd24](https://github.com/energywebfoundation/iam-cache-server/commit/1c0dd2444662d1ed68798adb1e55acf8f21204c0))
* **docker-compose.prod.yml:** removing redundant values from port number ([7bb219d](https://github.com/energywebfoundation/iam-cache-server/commit/7bb219db23ca4d09e7762b8f18f6a72994e219c1))
* **docker-compose.prod.yml:** updating env_file ([b281f08](https://github.com/energywebfoundation/iam-cache-server/commit/b281f08060d960e9846611d02c8afd3d612efc0f))
* **docker-compose.prod.yml:** using local image ([53cdda2](https://github.com/energywebfoundation/iam-cache-server/commit/53cdda2fcb9f15f04fee69cccf5fc22fe7d9c6cb))
* **docker-compose.yml:** fixing building command ([a3c21d6](https://github.com/energywebfoundation/iam-cache-server/commit/a3c21d6628b55cb78baf79e56452b39755a43fe8))
* **ens.service:** domainReader for registry events ([aa51588](https://github.com/energywebfoundation/iam-cache-server/commit/aa51588f40dd5052d7dbc14e42751febcf34e919))
* **ens.service:** fix import of DomainNotifier from iam-contracts ([e84c292](https://github.com/energywebfoundation/iam-cache-server/commit/e84c292339baeda198871c2fbe8622741b361367))
* **ens:** avoid read metadata from `roles` and `apps` domains ([e35dd9d](https://github.com/energywebfoundation/iam-cache-server/commit/e35dd9d15910946de2be2e1dc887b840937201c8))
* **ens:** fix ENS event listeners ([9cdc8f7](https://github.com/energywebfoundation/iam-cache-server/commit/9cdc8f7046d860652908228c6dec0197a61104c6))
* **ens:** make ens folder lowercase ([adb082b](https://github.com/energywebfoundation/iam-cache-server/commit/adb082ba9f0178bae2812f8eab98cd4dbe4e7d51))
* **ens:** make ens folder lowercase ([acad028](https://github.com/energywebfoundation/iam-cache-server/commit/acad0286b74b11f2491182fa9b4fd12da853a08f))
* **env_file:** setting env_file from command line ([7d9a0b1](https://github.com/energywebfoundation/iam-cache-server/commit/7d9a0b1528f5843297b904ab507a266c378596cc))
* **FieldsDTO:** using IsDate validation for minDate and maxDate ([f748fcc](https://github.com/energywebfoundation/iam-cache-server/commit/f748fcc9f4d9ae7fae256abb868c590779390fb6))
* filter by requester ([2cad076](https://github.com/energywebfoundation/iam-cache-server/commit/2cad0762149635be5e4c999682f9519ea5259886))
* fix ci db configuration ([764dfcf](https://github.com/energywebfoundation/iam-cache-server/commit/764dfcfc0c61ab70814291269b59cada45709b54))
* fix ci db configuration ([056f1db](https://github.com/energywebfoundation/iam-cache-server/commit/056f1db722fc3b5ea2efb01bd5803bb311cfdf39))
* fix ci db configuration ([d58825c](https://github.com/energywebfoundation/iam-cache-server/commit/d58825c5968a0760e3bb8e0f21f6fb3f7c378b1a))
* fix ci db configuration ([d4fc2e4](https://github.com/energywebfoundation/iam-cache-server/commit/d4fc2e4bca84c420464f376b982d4794ddc651d7))
* fix ci db configuration ([8f28abf](https://github.com/energywebfoundation/iam-cache-server/commit/8f28abfb9b13b788bcd9ce0f3b7f9de938ee3016))
* fix failing tests ([4e33f91](https://github.com/energywebfoundation/iam-cache-server/commit/4e33f919f9123682c6e0ec1c62c321869acd8664))
* fix failing tests ([9c239db](https://github.com/energywebfoundation/iam-cache-server/commit/9c239dbf7ccf94de7e39979942f62550877e20e9))
* fix failing tests ([aba393f](https://github.com/energywebfoundation/iam-cache-server/commit/aba393f4b7e27a473231e60ddafec25d5a0eee62))
* fix queryfailed error relating to missing column ([9381ef9](https://github.com/energywebfoundation/iam-cache-server/commit/9381ef935763ea48107dd04833d9fc84544ab699))
* **GHA_workflow:** running build script for prod mode ([8faa015](https://github.com/energywebfoundation/iam-cache-server/commit/8faa015647e6eecdee65700c4c96287c425f1dcf))
* **graphql:** fix generating graphql schema ([fe6786a](https://github.com/energywebfoundation/iam-cache-server/commit/fe6786aa05bf8f7ef0425eb31f7b8e8fdc68a9f2))
* **graphql:** fix generating graphql schema ([48e1ade](https://github.com/energywebfoundation/iam-cache-server/commit/48e1adea063a0e59ee62992e736be4524892073a))
* ignore health checks for sampling ([3db092b](https://github.com/energywebfoundation/iam-cache-server/commit/3db092be2363f04a6dc2109c7de6b6897db4fe18))
* install jwt keys ([d5f81da](https://github.com/energywebfoundation/iam-cache-server/commit/d5f81dac8f30d7c7071d11a95c2160aa43c5af1e))
* **main:** iam cache server is not able to start ([c76d433](https://github.com/energywebfoundation/iam-cache-server/commit/c76d4330a93e2f42b444341703cceeecae337b7d))
* **main:** iam cache server is not able to start ([93c1383](https://github.com/energywebfoundation/iam-cache-server/commit/93c13839110ea063780af324fe44911c72ee2230))
* not returning isRejected on claim ([84fed98](https://github.com/energywebfoundation/iam-cache-server/commit/84fed98b16aa3f4caff14accd89fd9b61e2dd229))
* **organization:** fix returning sub-orgs by a given parent namespace ([a893a87](https://github.com/energywebfoundation/iam-cache-server/commit/a893a8789db426c03fe78ff343622051758c585a))
* **precondtions:** precondtions need to have condtions prop ([25e38f6](https://github.com/energywebfoundation/iam-cache-server/commit/25e38f6a635d585ca40184a6d6b0fbab95c5b46e))
* **precondtions:** precondtions need to have condtions prop ([88575ac](https://github.com/energywebfoundation/iam-cache-server/commit/88575ac8b5a4280353a20d5dc38ecb60054719d6))
* read redis config on app bootstrap ([c2575f2](https://github.com/energywebfoundation/iam-cache-server/commit/c2575f2d1cc21db1924c09ce24fa679653b79835))
* **redis:** remove old bull job info/metadata ([0c1cf13](https://github.com/energywebfoundation/iam-cache-server/commit/0c1cf13b4511b50544fe73436d1d25afba6505e3))
* remove claimmanager address ([83f25ad](https://github.com/energywebfoundation/iam-cache-server/commit/83f25ad95a4742dd52ae2bd96d206bf0d69b331c))
* remove default image tag ([7a83d28](https://github.com/energywebfoundation/iam-cache-server/commit/7a83d28b3768ce0c54a43d4b57bf02e383ee353b))
* remove staking ([fe3279a](https://github.com/energywebfoundation/iam-cache-server/commit/fe3279a472e069e09c896f04e95543b61d625c98))
* replace methods ([74afff0](https://github.com/energywebfoundation/iam-cache-server/commit/74afff089fad7a4b374f6624eca81b294ca28e8b))
* rethrow axios error on DID doc fetching ([418decd](https://github.com/energywebfoundation/iam-cache-server/commit/418decd870e790fe37d52b86d97992a8978328a4))
* revert package updates ([81070a3](https://github.com/energywebfoundation/iam-cache-server/commit/81070a3ca2ecb716c6720dc68813855e6634aff6))
* **role.service:** check for empty conditions array ([d4b52ac](https://github.com/energywebfoundation/iam-cache-server/commit/d4b52acc62f12ee1c8a24c5421db665be2903fdc))
* **role.service:** check for empty conditions array ([1d446d3](https://github.com/energywebfoundation/iam-cache-server/commit/1d446d3de10422ec1f660d3209d5c2876589d61c))
* run jest from container ([981e87b](https://github.com/energywebfoundation/iam-cache-server/commit/981e87b164f6263b0510344aa61e7ab09e9dbe05))
* **sentry:** remove identity token from event ([c65ce08](https://github.com/energywebfoundation/iam-cache-server/commit/c65ce0810d0ec09006dc9643014f5a5862929758))
* **sentry:** sentry not displaying maps ([3fe6a13](https://github.com/energywebfoundation/iam-cache-server/commit/3fe6a132c66fcc497f6d367c72eaa415d4911c34))
* **sentry:** sentry not displaying maps ([9c695e4](https://github.com/energywebfoundation/iam-cache-server/commit/9c695e41fe07902b71c07675f6325267a8565e95))
* **sentry:** strip access token from req cookie ([403254b](https://github.com/energywebfoundation/iam-cache-server/commit/403254b6cdc426de3133e031a134b886d3a32a2d))
* service is unhealthy error ([802bfb3](https://github.com/energywebfoundation/iam-cache-server/commit/802bfb38fade4968ea01fe23c6e3d68e41af2e07))
* service is unhealthy error ([f0b0797](https://github.com/energywebfoundation/iam-cache-server/commit/f0b0797b215d6ef9198f0cc0ef7ea12c09f5ab74))
* service is unhealthy error ([ab64812](https://github.com/energywebfoundation/iam-cache-server/commit/ab648128e36c177bd2be9e45a07a2b713e050889))
* set refresh token ttl ([67dd811](https://github.com/energywebfoundation/iam-cache-server/commit/67dd8110933f49a8fafe057f61dc3db063b4c8aa))
* **subOrgs:** not updating subOrgs definitions ([ee70734](https://github.com/energywebfoundation/iam-cache-server/commit/ee707344b4e85e0730692a4cf2a4c166c5a3b88a))
* **subOrgs:** not updating subOrgs definitions ([375ada4](https://github.com/energywebfoundation/iam-cache-server/commit/375ada46550ddc422dbcc03ba3eda41e7d6bd10e))
* tslint comment error ([fe13246](https://github.com/energywebfoundation/iam-cache-server/commit/fe13246436610cd292ad41cf7ed08cb20ec44c95))
* tslint comment error ([ddf6ec0](https://github.com/energywebfoundation/iam-cache-server/commit/ddf6ec06fee414ca9e44f0cf6f9a34d21308854c))
* **typdoc:** fix documentation ([e97cb59](https://github.com/energywebfoundation/iam-cache-server/commit/e97cb599fe074e5b3a592038fca130d63026a817))
* update claimmanager address ([f2ec509](https://github.com/energywebfoundation/iam-cache-server/commit/f2ec509378a45f15ac0b374bb6a8479a4d58d1f9))
* update document by did ([cf6cf7d](https://github.com/energywebfoundation/iam-cache-server/commit/cf6cf7d3eabfb0ba3f09620895f13db5c226e47f))
* update ew-did-reg to fix rewrapping of logs ([09d0753](https://github.com/energywebfoundation/iam-cache-server/commit/09d075347084d2c5ff3b9e6c89337a96b8138665))
* update iam-contracts to fix ENS Sync ([35be4ef](https://github.com/energywebfoundation/iam-cache-server/commit/35be4ef6f19d599d22d1a82fc7c3a272444353ee))

## [2.0.0](2021-09-20)

### BREAKING CHANGES

- **all endpoints:** updates all endpoints to use versioning(v1)

### Features

- **claim.dto:** claimTypeVersion param now requires stringNumber type
- **claim:** claim access now includes authorization check
- **claim:** adds getBySubject endpoint
- **claim:** adds claim registration types
- **claim:** ignore claimIssuer when fetching claims by subjects DIDs
- **claim:** persist onchain proof in database
- **claim:** persist subject agreement in database
- **claim:** adds staking pool service
- **role:** getAll role method
- support of apple M1 ARM based systems

### Bug Fixes

- **claim:** return claim id from claim data
- **claim:** ignore filtering claims when roles is empty
- **claim:** filter claims by requester
- **claim:** issuedToken now optional
- **did.controller:** remove includeClaims param for /DID endpoint
- **did.service:** handle trailing slash in UNIVERSAL_RESOLVER_CONFIG
- adds generation of jwt keys to installation process
