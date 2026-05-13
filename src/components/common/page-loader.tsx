import { Spinner } from '@/components/ui/spinner';

export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="lg" />
    </div>
  );
}
