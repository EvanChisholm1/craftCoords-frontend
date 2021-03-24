import { API_URL } from 'constants/index';
import { FC, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const CreateWorld: FC = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const createWorld = useMutation(
    async ({ name }: { name: string }) => {
      const req = await fetch(`${API_URL}/worlds`, {
        method: 'POST',
        headers: {
          auth_token: localStorage.getItem('auth_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });

      const res = await req.json();
      return res;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('worlds'),
    }
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createWorld.mutate({ name });
    setName('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">World Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateWorld;
