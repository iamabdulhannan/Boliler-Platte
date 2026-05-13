import type { User } from '@/types';

export const DEMO_CREDENTIALS = {
  email: 'admin@mailinator.com',
  password: 'admin1233',
} as const;

export const demoUser: User = {
  id: 'usr_demo_001',
  email: DEMO_CREDENTIALS.email,
  name: 'Admin User',
  role: 'admin',
  avatarUrl: undefined,
  createdAt: new Date('2024-01-15T09:00:00Z').toISOString(),
};

export const FAKE_ACCESS_TOKEN = 'demo-access-token-' + crypto.randomUUID();
export const FAKE_REFRESH_TOKEN = 'demo-refresh-token-' + crypto.randomUUID();
