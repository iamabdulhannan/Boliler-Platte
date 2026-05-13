import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import {
  DEMO_CREDENTIALS,
  demoUser,
  FAKE_ACCESS_TOKEN,
  FAKE_REFRESH_TOKEN,
} from './fixtures';

const baseUrl = env.API_BASE_URL.replace(/\/$/, '');

interface LoginBody {
  email?: string;
  password?: string;
}

interface RegisterBody {
  email?: string;
  password?: string;
  name?: string;
}

export const handlers = [
  http.post(`${baseUrl}/auth/login`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as LoginBody;

    if (
      body?.email?.toLowerCase() === DEMO_CREDENTIALS.email &&
      body?.password === DEMO_CREDENTIALS.password
    ) {
      return HttpResponse.json({
        user: demoUser,
        accessToken: FAKE_ACCESS_TOKEN,
        refreshToken: FAKE_REFRESH_TOKEN,
      });
    }

    return HttpResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }),

  http.post(`${baseUrl}/auth/register`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as RegisterBody;

    if (!body?.email || !body?.password || !body?.name) {
      return HttpResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    return HttpResponse.json({
      user: {
        ...demoUser,
        id: `usr_${crypto.randomUUID()}`,
        email: body.email,
        name: body.name,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
      },
      accessToken: FAKE_ACCESS_TOKEN,
      refreshToken: FAKE_REFRESH_TOKEN,
    });
  }),

  http.post(`${baseUrl}/auth/logout`, async () => {
    await delay(100);
    return HttpResponse.json({ success: true });
  }),

  http.post(`${baseUrl}/auth/refresh`, async () => {
    await delay(200);
    return HttpResponse.json({
      accessToken: FAKE_ACCESS_TOKEN,
      refreshToken: FAKE_REFRESH_TOKEN,
    });
  }),

  http.get(`${baseUrl}/auth/me`, async ({ request }) => {
    await delay(150);
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return HttpResponse.json(demoUser);
  }),
];
