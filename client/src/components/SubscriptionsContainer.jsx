import { useAppContext } from '../context/appContext';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import SearchSortContainer from './SearchSortContainer';
import CardsContainer from './CardsContainer';

const SubscriptionsContainer = (props) => {
  const { type } = props;
  const { getSubscriptions, subscriptions, isLoading } = useAppContext();
  const [ queryOptions, setQueryOptions ] = useState({type:type});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='subscriptions-container'>
      <SearchSortContainer
        type={type}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />
      <CardsContainer type={type}/>
    </section>
  );
};
export default SubscriptionsContainer;
