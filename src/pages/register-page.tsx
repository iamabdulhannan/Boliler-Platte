import { RegisterForm } from '@/features/auth/components/register-form';
import { useDocumentTitle } from '@/hooks/use-document-title';

export default function RegisterPage() {
  useDocumentTitle('Create account');
  return <RegisterForm />;
}
