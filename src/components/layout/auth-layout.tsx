import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { env } from '@/config/env';
import { PageLoader } from '@/components/common/page-loader';

export function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="mx-auto w-full max-w-sm">
          <Link to={ROUTES.HOME} className="mb-8 inline-block text-xl font-bold tracking-tight">
            {env.APP_NAME}
          </Link>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.3),transparent_50%)]" />
        <div className="relative z-10 max-w-md px-12 text-primary-foreground">
          <h2 className="text-4xl font-bold leading-tight">Build faster. Ship better.</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            A production-ready React boilerplate with everything wired up — auth, routing, theming,
            and testing.
          </p>
        </div>
      </div>
    </div>
  );
}
