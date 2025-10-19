import { checkHealth } from './src/shared/health.ts';

const health = checkHealth();
console.log(`Status: ${health.status}, Timestamp: ${health.timestamp}`);