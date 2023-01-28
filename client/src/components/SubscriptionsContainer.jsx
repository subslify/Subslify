import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Subscription from './Subscription';
import '../assets/styles/subscriptions-container.scss';

const SubscriptionsContainer = ({ type }) => {
  const { getSubscriptions, subscriptions, isLoading } = useAppContext();

  const currentSubscriptions = subscriptions[type] ?? [];

  useEffect(() => {
    getSubscriptions({ type });
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <section className='subscriptions-container'>
      <div className='subscriptions'>
        {currentSubscriptions.map((subscription) => {
          return <Subscription key={subscription._id} {...subscription} />;
        })}
      </div>
    </section>
  );
};
export default SubscriptionsContainer;
