import { useAppContext } from '../context/appContext';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import SearchSortContainer from './SearchSortContainer';
import Card from './Card';

const SubscriptionsContainer = (props) => {
  const { type } = props;
  const { isLoading, subscriptions, getSubscriptions } = useAppContext();
  const [ queryOptions, setQueryOptions ] = useState({type, search: '', sort: ''});
  const filteredSubs = subscriptions[type]??[];
  console.log('queryOptions', queryOptions);
  //queryoptions doesn't update with new state with when search and sort are toggled
  //therefore, when useeffect is invoked after boomeranging back to page, subscriptions brings down results based on type only
  //I am doing something wrong with the local state update or I need to use global
  useEffect(() => {
    getSubscriptions(queryOptions);
  }, [queryOptions]);

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
      <div className='subscriptions'>
      {filteredSubs.map((subscription) => {
        return <Card key={subscription._id} {...subscription} />;
      })}
    </div>
    </section>
  );
};
export default SubscriptionsContainer;
