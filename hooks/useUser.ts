import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { API_URL } from 'constants/index';
import { HttpError } from '../lib/HttpError';

interface MeResponse {
  email?: string;
  id?: string;
  error?: {
    message: string;
    status: number;
  };
}

export default function useUser() {
  const router = useRouter();
  const { error, ...userQuery } = useQuery<MeResponse, HttpError>(
    'user',
    async () => {
      const req = await fetch(`${API_URL}/me`, {
        headers: {
          auth_token: localStorage.getItem('auth_token') || '',
        },
      });
      const res: MeResponse = await req.json();
      if (res.error) throw new HttpError(res.error.message, res.error.status);
      console.log(res);
      return res;
    }
  );

  useEffect(() => {
    if (error?.status === 401) router.replace('/login');
  }, [error]);

  return { ...userQuery, error };
}
