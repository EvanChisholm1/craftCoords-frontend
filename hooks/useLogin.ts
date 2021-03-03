import { useMutation, UseMutationOptions } from 'react-query';
import { useTokenContext } from '../components/TokenContext';
import { API_URL } from '../constants';
import { HttpError } from '../lib/HttpError';

interface LoginArgs {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  error?: {
    message: string;
    status: number;
  };
}

export default function useLogin(
  options: UseMutationOptions<LoginResponse, HttpError, LoginArgs>
) {
  const { setToken } = useTokenContext();

  const mutation = useMutation<LoginResponse, HttpError, LoginArgs>(
    async ({ email, password }) => {
      const req = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res: LoginResponse = await req.json();
      if (res.error) throw new HttpError(res.error.message, req.status);
      return res;
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        setToken(data.token);
        options.onSuccess(data, variables, context);
      },
    }
  );

  return mutation;
}
