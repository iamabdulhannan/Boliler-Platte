import { useEffect } from 'react';
import { env } from '@/config/env';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · ${env.APP_NAME}` : env.APP_NAME;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
