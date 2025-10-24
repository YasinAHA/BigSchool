import amqp from 'amqplib';

// Event shape used by consumer (kept small for the example)
interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  total: number;
}

const RABBIT_URL = process.env.AMQP_URL || 'amqp://localhost';
const QUEUE = 'order.created';

/**
 * Starts a consumer that calls `onEvent` for each incoming message.
 * The consumer acknowledges messages when successfully processed.
 */
export async function startConsumer(onEvent: (evt: OrderCreatedEvent) => void) {
  const conn = await amqp.connect(RABBIT_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue(QUEUE, { durable: false });
  console.log(`Waiting messages on queue '${QUEUE}'...`);

  ch.consume(QUEUE, (msg: amqp.ConsumeMessage | null) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString()) as OrderCreatedEvent;
      onEvent(event);
      ch.ack(msg);
    } catch (err) {
      console.error('Failed to handle message', err);
      // In a real app you might move the message to a dead-letter queue
      ch.nack(msg, false, false);
    }
  });
}

// If run directly with ts-node, start the consumer and log events
if (require.main === module) {
  startConsumer((evt) => console.log('Received event:', evt)).catch((err) => {
    console.error('Consumer error', err);
    process.exit(1);
  });
}
