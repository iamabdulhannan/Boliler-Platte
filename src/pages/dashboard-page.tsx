import { Activity, ArrowUpRight, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDocumentTitle } from '@/hooks/use-document-title';

const stats = [
  { label: 'Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign },
  { label: 'Active users', value: '2,350', change: '+5.4%', icon: Users },
  { label: 'Engagement', value: '74%', change: '+2.1%', icon: Activity },
  { label: 'Conversion', value: '3.2%', change: '+0.6%', icon: ArrowUpRight },
];

export default function DashboardPage() {
  useDocumentTitle('Dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">An overview of your activity today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-accent">{change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to your boilerplate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>This dashboard is wired up with:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Protected routing via React Router</li>
            <li>Auth state managed by Zustand with persistence</li>
            <li>Server state via TanStack Query + Axios interceptors</li>
            <li>Forms with React Hook Form + Zod validation</li>
            <li>Tailwind + shadcn/ui design system with dark mode</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
