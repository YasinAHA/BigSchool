import './payment.listener';
import { createOrder } from './order.service';

// Demo: emitir un evento de creación de orden
createOrder('order-1', 'user-123', 49.99);
