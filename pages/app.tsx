import useUser from '../hooks/useUser';
import Worlds from '../components/Worlds';

export default function App() {
  const { status: userStatus } = useUser();
  return (
    <div>{userStatus === 'loading' ? <div>loading...</div> : <Worlds />}</div>
  );
}
