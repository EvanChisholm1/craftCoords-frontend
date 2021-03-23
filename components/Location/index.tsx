import { API_URL } from 'constants/index';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CoordsType } from 'types/apiTypes';

const Location: FC<CoordsType> = ({ name, _id, x, y, z }) => {
  const queryClient = useQueryClient();
  const deleteLocation = useMutation(
    async ({ id }: { id: string }) => {
      const req = await fetch(`${API_URL}/coords/${id}`, {
        method: 'DELETE',
        headers: {
          auth_token: localStorage.getItem('auth_token'),
        },
      });

      const res = req.json();
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('world');
      },
    }
  );

  return (
    <div>
      {deleteLocation.isLoading && <h2>loading...</h2>}
      <h2>{name}</h2>
      <p>
        X: {x} Y: {y} Z: {z}
      </p>
      <button
        disabled={deleteLocation.isLoading || deleteLocation.isError}
        onClick={() => deleteLocation.mutate({ id: _id })}
      >
        delete
      </button>
    </div>
  );
};

export default Location;
