import { API_URL } from 'constants/index';
import { FC, useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
  worldId: string;
}

interface LocationMutationVars {
  x: number;
  y: number;
  z: number;
  name: string;
}

const CreateLocation: FC<Props> = ({ worldId }) => {
  const queryClient = useQueryClient();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [name, setName] = useState('');

  const createLocation = useMutation(
    async ({ x, y, z, name }: LocationMutationVars) => {
      const req = await fetch(`${API_URL}/coords/${worldId}`, {
        method: 'POST',
        headers: {
          auth_token: localStorage.getItem('auth_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x,
          y,
          z,
          name,
        }),
      });

      const res = await req.json();
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('world');
      },
    }
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submiting form');
    createLocation.mutate({ name, x, y, z });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Location Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={e => setName(e.target.value)}
        value={name}
        required
      />

      <label htmlFor="x">X Cooridinate</label>
      <input
        type="number"
        name="x"
        id="x"
        onChange={e => setX(parseFloat(e.target.value))}
        value={x}
        required
      />

      <label htmlFor="y">Y Cooridinate</label>
      <input
        type="number"
        name="y"
        id="y"
        onChange={e => setY(parseFloat(e.target.value))}
        value={y}
        required
      />

      <label htmlFor="Z">Z Cooridinate</label>
      <input
        type="number"
        name="z"
        id="z"
        onChange={e => setZ(parseFloat(e.target.value))}
        value={z}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLocation;
