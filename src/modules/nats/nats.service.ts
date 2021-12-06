import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { NatsWrapper } from './nats.wrapper';


export type IMessageJob = {
  subject: string;
  data: Record<string, unknown>;
};
@Injectable()
@Processor('nats-messages')
export class NatsService {
  natsEnvironmentName: string;

  constructor(
    private natsWrapper: NatsWrapper,
    private readonly config: ConfigService,
    @InjectQueue('nats-messages')
    private readonly messagesQueue: Queue<IMessageJob>,
  ) {
    this.natsEnvironmentName = this.config.get<string>('NATS_ENVIRONMENT_NAME');
  }

  public async publishForDids(
    requestType: string,
    topic: string,
    dids: string[],
    data: Record<string, unknown>,
  ) {
    await Promise.all(
      dids.map(did =>
        this.messagesQueue.add('message', {
          subject: `${requestType}.${topic}.${did}.${this.natsEnvironmentName}`,
          data: { type: requestType, ...data },
        }),
      ),
    );
  }

  @Process('message')
  public processMessage(job: Job<IMessageJob>) {
    const { subject, data } = job.data;
    this.natsWrapper.publish(subject, data);
  }
}
