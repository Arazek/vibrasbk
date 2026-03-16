// Polyfill for crypto global - required for @nestjs/schedule in Node.js < 19
// In Node.js 18, globalThis.crypto exists but may not be set in all environments
if (!globalThis.crypto) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  (globalThis as unknown as Record<string, unknown>).crypto = require('crypto').webcrypto;
}
