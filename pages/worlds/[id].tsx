import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import World from 'components/Locations';
import CreateLocation from 'components/CreateLocation';

export default function WorldPage(props) {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading } = useUser();

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      {id && (
        <>
          <CreateLocation worldId={id as string} />
          <World id={id as string} />
        </>
      )}
    </div>
  );
}
