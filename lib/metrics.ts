import client from 'prom-client';

// Prevent re-registration of metrics in development (Next.js hot reloading)
const globalForMetrics = global as unknown as {
  prometheusRegistry: client.Registry;
  apiRequestCounter: client.Counter;
};

export const registry = globalForMetrics.prometheusRegistry || new client.Registry();

if (!globalForMetrics.prometheusRegistry) {
  // Collect default metrics (memory, CPU, uptime) and bind to our custom registry
  client.collectDefaultMetrics({ register: registry });
  globalForMetrics.prometheusRegistry = registry;
}

// Define the simple API counter
export const apiRequestCounter = globalForMetrics.apiRequestCounter || new client.Counter({
  name: 'api_requests_total',
  help: 'Total number of API requests made',
  labelNames: ['route', 'method'],
  registers: [registry],
});

if (!globalForMetrics.apiRequestCounter) {
  globalForMetrics.apiRequestCounter = apiRequestCounter;
}
