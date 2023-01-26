import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Subscription from './Subscription';

const SubscriptionsContainer = () => {
  const { getSubscriptions, subscriptions, loading } = useAppContext();
  const [options, setOptions] = useState({ type, sort, search });

  useEffect(() => {
    getSubscriptions({});
  }, [options]);

  return (
    <div>
      <SearchContainer state={(state, setState)} />
      SubscriptionsContainer
    </div>
  );
};
export default SubscriptionsContainer;
