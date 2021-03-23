import { FC } from 'react';
import useWorlds from '../../hooks/useWorlds';
import Link from 'next/link';

const Worlds: FC = () => {
  const { status, error, data } = useWorlds();
  return (
    <div>
      {status === 'loading' ? (
        <div>loading...</div>
      ) : status === 'error' ? (
        <h1>
          Error {error.status}: {error.message}
        </h1>
      ) : (
        <div>
          {data.worlds.map(world => (
            <div key={world._id}>
              <Link href={`/worlds/${world._id}`}>
                <a>
                  <h2>{world.name}</h2>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Worlds;
