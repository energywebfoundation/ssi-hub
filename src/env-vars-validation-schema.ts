import JoiBase, { CustomHelpers } from 'joi';
import { utils } from 'ethers';

declare type JoiType = typeof JoiBase;

interface ExtendedJoi extends JoiType {
  ethAddr(): this;
}

const Joi = <ExtendedJoi>JoiBase.extend((joi) => ({
  type: 'ethAddr',
  base: joi.string(),
  messages: {
    ethAddr: '{{#label}} must be a valid ethereum address',
  },
  validate(value: string, helpers: CustomHelpers) {
    if (!utils.isAddress(value)) {
      return { value, errors: helpers.error('ethAddr') };
    }

    return value;
  },
}));

export const envVarsValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  NESTJS_PORT: Joi.number().port().default(3000),

  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_HOST: Joi.string().hostname().required(),

  NATS_CLIENTS_URL: Joi.string().required(), // TODO: store whole URL here, including `nats://` and validate as URL
  NATS_ENVIRONMENT_NAME: Joi.string().required(),

  ROOT_DOMAIN: Joi.string().domain().required(),
  CHAIN_ID: Joi.number().positive().required(),
  CHAIN_NAME: Joi.string().required(),
  ENS_URL: Joi.string().uri().required(),

  PUBLIC_RESOLVER_ADDRESS: Joi.ethAddr().required(),
  ENS_REGISTRY_ADDRESS: Joi.ethAddr().required(),
  DID_REGISTRY_ADDRESS: Joi.ethAddr().required(),
  DOMAIN_NOTIFIER_ADDRESS: Joi.ethAddr().required(),
  RESOLVER_V1_ADDRESS: Joi.ethAddr().required(),
  RESOLVER_V2_ADDRESS: Joi.ethAddr().required(),
  CHAIN_REQUEST_ATTEMPTS: Joi.number().positive(),

  ASSETS_MANAGER_ADDRESS: Joi.ethAddr().required(),
  ASSETS_SYNC_INTERVAL_IN_HOURS: Joi.number().positive().required(),
  ASSETS_SYNC_HISTORY_INTERVAL_IN_HOURS: Joi.number().positive().required(),
  ASSETS_SYNC_ENABLED: Joi.boolean().required(),

  IPFS_CLIENT_HOST: Joi.string().hostname(),
  IPFS_CLIENT_PORT: Joi.number().port(),
  IPFS_CLIENT_PROJECT_ID: Joi.string(),
  IPFS_CLIENT_PROJECT_SECRET: Joi.string(),

  DID_SYNC_MODE_FULL: Joi.boolean().required(),
  DID_SYNC_ENABLED: Joi.boolean().required(),
  DIDDOC_SYNC_INTERVAL_IN_HOURS: Joi.number().positive().required(),
  ENS_SYNC_ENABLED: Joi.boolean().required(),
  ENS_SYNC_INTERVAL_IN_HOURS: Joi.number().positive().required(),

  ENABLE_AUTH: Joi.boolean().required(),
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_PUBLIC_KEY: Joi.string().required(),
  STRATEGY_CACHE_SERVER: Joi.string().uri().required(),
  STRATEGY_PRIVATE_KEY: Joi.string().hex(),
  STRATEGY_NUM_BLOCKS_BACK: Joi.number().positive().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(), // TODO: implement validation of this flexible format
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(), // TODO: implement validation of this flexible format
  JWT_ACCESS_TOKEN_NAME: Joi.string().required(),
  JWT_REFRESH_TOKEN_NAME: Joi.string().required(),

  UNIVERSAL_RESOLVER_URL: Joi.string().uri().required(),

  SENTRY_DNS: Joi.string().allow(''),
  SENTRY_ENV: Joi.string().allow(''),
  SENTRY_RELEASE: Joi.string().allow(''),

  STATUS_LIST_DOMAIN: Joi.string().uri().required(),
});
