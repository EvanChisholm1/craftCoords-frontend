import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useUser from '../hooks/useUser';

export default function App() {
  const router = useRouter();
  const { error } = useUser();
  useEffect(() => {
    if (error?.status === 401) router.replace('/login');
  }, [error]);
  return <div>hello world</div>;
}
