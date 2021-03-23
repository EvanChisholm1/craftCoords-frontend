import { useQuery } from 'react-query';
import { API_URL } from 'constants/index';
import { HttpError } from '../lib/HttpError';

interface WorldResp {
  worlds: { name: string; created: Date; owner: string; _id: string }[];
  error: {
    message: string;
    status: number;
  };
}

export default function useWorlds() {
  const worldsQuery = useQuery<WorldResp, HttpError>('worlds', async () => {
    const req = await fetch(`${API_URL}/worlds`, {
      headers: {
        auth_token: localStorage.getItem('auth_token') || '',
      },
    });
    const res: WorldResp = await req.json();
    if (res.error) throw new HttpError(res.error.message, res.error.status);
    return res;
  });

  return worldsQuery;
}
