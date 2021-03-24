import { FC } from 'react';
import useWorlds from '../../hooks/useWorlds';
import WorldItem from 'components/WorldItem';
import CreateWorld from 'components/CreateWorld';

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
        <>
          <CreateWorld />
          <ul>
            {data.worlds.map(world => (
              <WorldItem key={world._id} id={world._id} name={world.name} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Worlds;
