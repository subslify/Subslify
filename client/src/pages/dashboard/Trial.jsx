import { Search, Sort, SubscriptionsContainer } from '../../components';

const Trial = () => {
  return (
    <>
      <div>Trial Subscriptions</div>
      <SubscriptionsContainer />
      <Search type='trail' />
      <Sort type='trail' />
    </>
  );
};

export default Trial;
