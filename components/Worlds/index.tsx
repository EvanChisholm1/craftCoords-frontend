import { FC } from 'react';
import useWorlds from '../../hooks/useWorlds';

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
            <div>
              <h2 key={world._id}>{world.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Worlds;
