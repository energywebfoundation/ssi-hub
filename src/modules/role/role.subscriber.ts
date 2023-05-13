import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { inspect } from 'util';
import { Logger } from '../logger/logger.service';
import { Role } from './role.entity';

export const ENERGY_CREDENTIAL_NAME_PATTERN = `^energy.roles.((?<year>[0-9]{4}).)`;

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<Role> {
  constructor(
    private readonly logger: Logger,
    private readonly dataSource: DataSource
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Role;
  }

  beforeInsert(event: InsertEvent<Role>) {
    if (!event.entity.namespace.match(ENERGY_CREDENTIAL_NAME_PATTERN)) {
      return;
    }
    this.logger.debug(
      `Inserting new ${inspect(event.entity, { depth: 10, colors: true })}`
    );
  }

  beforeUpdate(event: UpdateEvent<Role>) {
    if (!event.entity.namespace.match(ENERGY_CREDENTIAL_NAME_PATTERN)) {
      return;
    }
    this.logger.debug(
      `Updating ${inspect(event.entity, { depth: 10, colors: true })}`
    );
  }
}
