import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useDocumentTitle } from '@/hooks/use-document-title';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="text-lg text-muted-foreground">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Button asChild>
        <Link to={ROUTES.DASHBOARD}>Go to dashboard</Link>
      </Button>
    </div>
  );
}
