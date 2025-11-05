import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { Channel, Message } from 'amqplib';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck?: boolean): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URI') || ''],
        queue:
          this.configService.get<string>(`RMQ_${queue.toUpperCase()}_QUEUE`) ||
          '',
        noAck: noAck || false,
        persistent: true,
      },
    };
  }
  ack(context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMessage = context.getMessage() as Message;
    channel.ack(originalMessage);
  }
}
