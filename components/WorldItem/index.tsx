import { API_URL } from 'constants/index';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
}

const WorldItem: FC<Props> = ({ id, name }) => {
  const queryClient = useQueryClient();
  const deleteWorld = useMutation(
    async ({ id }: { id: string }) => {
      const req = await fetch(`${API_URL}/world/${id}`, {
        method: 'DELETE',
        headers: {
          auth_token: localStorage.getItem('auth_token'),
        },
      });

      const res = await req.json();
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('worlds');
      },
    }
  );

  return (
    <li>
      <Link href={`/worlds/${id}`}>
        <a style={{ display: 'block' }}>
          <h2>{name}</h2>
        </a>
      </Link>
      <button onClick={() => deleteWorld.mutate({ id })}>Delete</button>
    </li>
  );
};

export default WorldItem;
