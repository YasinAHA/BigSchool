import amqp from 'amqplib';

// Simple typed event for the example
interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  total: number;
}

const RABBIT_URL = process.env.AMQP_URL || 'amqp://localhost';
const QUEUE = 'order.created';

/**
 * Publishes an OrderCreated event to the configured queue.
 * Keeps the implementation very small for teaching purposes.
 */
export async function publishOrderCreated(event: OrderCreatedEvent) {
  const conn = await amqp.connect(RABBIT_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue(QUEUE, { durable: false });
  ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(event)));

  await ch.close();
  await conn.close();
}

// If run directly with ts-node: publish a sample event
if (require.main === module) {
  (async () => {
    const sample: OrderCreatedEvent = {
      orderId: 'abc123',
      userId: 'user42',
      total: 100
    };

    await publishOrderCreated(sample);
    console.log('Published event:', sample);
  })().catch((err) => {
    console.error('Publisher error', err);
    process.exit(1);
  });
}
