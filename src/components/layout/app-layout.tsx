import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { PageLoader } from '@/components/common/page-loader';

export function AppLayout() {
  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
