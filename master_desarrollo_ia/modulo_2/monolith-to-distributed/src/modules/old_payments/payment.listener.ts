// src/modules/payments/payment.listener.ts

import { eventBus } from "../../event-bus";
import { OrderCreatedEvent } from "../orders/order-created.event";

eventBus.on("order.created", (event : OrderCreatedEvent | null) => {
  if (event) {
    console.log(
      `[Monolith] Processing payment for order ${event.orderId} of amount ${event.total}`
    );
    // Aquí iría la lógica real de procesamiento de pagos
  }
});