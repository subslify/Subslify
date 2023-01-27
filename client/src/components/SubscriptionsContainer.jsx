import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Card from './Card';

const SubscriptionsContainer = () => {
  const { getSubscriptions, subscriptions, isLoading } = useAppContext();

  useEffect(() => {
    getSubscriptions({});
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='subscriptions-container'>
      <div className='subscriptions'>
        {subscriptions.map((subscription) => {
          return <Card key={subscription._id} {...subscription} />;
        })}
      </div>
    </section>
  );
};
export default SubscriptionsContainer;
