import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Card from './Card';

const CardsContainer = (props) => {
  const { type } = props;
  const { getSubscriptions, subscriptions } = useAppContext();
  const filteredSubs = subscriptions[type]??[];

  useEffect(() => {
    getSubscriptions({type});
  }, []);

  return (
    <div className='subscriptions'>
      {filteredSubs.map((subscription) => {
        return <Card key={subscription._id} {...subscription} />;
      })}
    </div>
  );
};
export default CardsContainer;
