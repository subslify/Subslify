import { useState, useEffect } from 'react';
import SearchSortContainer from './SearchSortContainer';
import CardsContainer from './CardsContainer';
import { useAppContext } from '../context/appContext';

const SubscriptionsContainer = (props) => {
  const { type } = props;
  const [queryOptions, setQueryOptions] = useState({type:type});

  const { getSubscriptions } = useAppContext();

  useEffect(() => {
    getSubscriptions(queryOptions);
  }, [queryOptions]);

  return (
    <div className='subscriptions-container'>
      {/* This needs to be made more efficient, no need to destructure and pass down this many times */}
      <SearchSortContainer
        type={type}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />
      <CardsContainer />
    </div>
  );
};

export default SubscriptionsContainer;
