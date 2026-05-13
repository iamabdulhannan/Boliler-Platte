import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/config/routes';
import { getApiErrorMessage } from '@/lib/api-error';

export function useRegister() {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setSession(data);
      toast.success('Account created successfully');
      navigate(ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Registration failed'));
    },
  });
}
