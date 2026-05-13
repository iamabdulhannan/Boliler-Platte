import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('React Pro Boilerplate'),
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL'),
  VITE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_GA_ID: z.string().optional(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Check .env file.');
}

export const env = {
  APP_NAME: parsed.data.VITE_APP_NAME,
  API_BASE_URL: parsed.data.VITE_API_BASE_URL,
  ENV: parsed.data.VITE_ENV,
  IS_DEV: parsed.data.VITE_ENV === 'development',
  IS_PROD: parsed.data.VITE_ENV === 'production',
  SENTRY_DSN: parsed.data.VITE_SENTRY_DSN,
  GA_ID: parsed.data.VITE_GA_ID,
} as const;
