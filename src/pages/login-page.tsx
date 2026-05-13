import { LoginForm } from '@/features/auth/components/login-form';
import { useDocumentTitle } from '@/hooks/use-document-title';

export default function LoginPage() {
  useDocumentTitle('Sign in');
  return <LoginForm />;
}
