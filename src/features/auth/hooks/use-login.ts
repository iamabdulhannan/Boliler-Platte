import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/config/routes';
import { getApiErrorMessage } from '@/lib/api-error';

interface LocationState {
  from?: { pathname: string };
}

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setSession(data);
      toast.success(`Welcome back, ${data.user.name}`);
      navigate(state?.from?.pathname ?? ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Login failed'));
    },
  });
}
