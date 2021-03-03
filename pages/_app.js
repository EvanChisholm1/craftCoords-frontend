import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TokenProvider } from '../components/TokenContext';
import { useRef } from 'react';

function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) queryClientRef.current = new QueryClient();

  return (
    <TokenProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TokenProvider>
  );
}

export default MyApp;
