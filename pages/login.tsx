import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const router = useRouter();
  const { status, mutate: login, error } = useLogin({
    onSuccess: () => {
      router.push('/app');
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div>
      {status === 'idle' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {status === 'loading' && <p>loading...</p>}
      {status === 'error' && (
        <>
          {error.status.toString().startsWith('5') && (
            <h1>Error: {error.status}</h1>
          )}
          <p>{error.message}</p>
        </>
      )}
    </div>
  );
}
