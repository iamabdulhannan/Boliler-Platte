import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/config/routes';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.PROFILE, label: 'Profile', icon: User },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside
      className="hidden w-64 shrink-0 border-r bg-card md:flex md:flex-col"
      aria-label="Primary"
    >
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-bold tracking-tight">React Pro</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
              )
            }
            end
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
