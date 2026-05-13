import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/queryClient';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { useTheme } from '@/hooks/use-theme';
import { env } from '@/config/env';

function ThemeInitializer({ children }: { children: ReactNode }) {
  useTheme();
  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeInitializer>
          {children}
          <Toaster richColors position="top-right" closeButton />
        </ThemeInitializer>
        {env.IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
