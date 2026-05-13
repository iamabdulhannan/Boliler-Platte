import { z } from 'zod';
import { api } from '@/lib/axios';
import type { User } from '@/types';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';

const userResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatarUrl: z.string().optional(),
  role: z.enum(['admin', 'user']),
  createdAt: z.string(),
});

const authResponseSchema = z.object({
  user: userResponseSchema,
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

async function parseAuthResponse(promise: Promise<{ data: unknown }>): Promise<AuthResponse> {
  const { data } = await promise;
  const result = authResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error('Invalid response from auth server. Check VITE_API_BASE_URL.');
  }
  return result.data;
}

export const authApi = {
  login: (payload: LoginInput) => parseAuthResponse(api.post('/auth/login', payload)),

  register: (payload: Omit<RegisterInput, 'confirmPassword'>) =>
    parseAuthResponse(api.post('/auth/register', payload)),

  logout: () => api.post('/auth/logout').then((res) => res.data),

  me: () => api.get<User>('/auth/me').then((res) => res.data),
};
