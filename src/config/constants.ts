export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  THEME: 'theme',
  USER: 'user',
} as const;

export const QUERY_KEYS = {
  USER: ['user'] as const,
  PROFILE: ['profile'] as const,
} as const;

export const TOAST_DURATION = 4000;
export const DEBOUNCE_DELAY = 300;
export const DEFAULT_PAGE_SIZE = 20;
