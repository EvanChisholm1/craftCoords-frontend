import { API_URL } from 'constants/index';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { WorldType } from 'types/apiTypes';
import Location from 'components/Location';

interface Props {
  id: string;
}

const World: FC<Props> = ({ id }) => {
  const { status, data: world } = useQuery<WorldType, any>(
    ['world', id],
    async () => {
      const req = await fetch(`${API_URL}/world/${id}/`, {
        headers: { auth_token: localStorage.getItem('auth_token') },
      });

      const res = await req.json();
      return res;
    }
  );

  return (
    <>
      {status === 'loading' ? (
        <h1>loading...</h1>
      ) : (
        <>
          <h1>{world.name}</h1>
          <ul>
            {world.coords.map(location => (
              <li key={location._id}>
                <Location {...location} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default World;
