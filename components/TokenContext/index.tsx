import { FC, createContext, useState, useEffect, useContext } from 'react';

interface ContextValues {
  token: string;
  setToken: (value: string) => void;
}
export const TokenContext = createContext<ContextValues>(null);

export const TokenProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const localToken = localStorage.getItem('auth_token');
    if (localToken) setToken(localToken);
  }, []);

  useEffect(() => {
    localStorage.setItem('auth_token', token);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export function useTokenContext() {
  return useContext(TokenContext);
}
