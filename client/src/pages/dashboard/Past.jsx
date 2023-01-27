import SubscriptionsContainer from '../../components/SubscriptionsContainer';
import { useAppContext } from '../../context/appContext';
import '../../assets/styles/search.scss';

const Past = () => {
  return (
    <div>
      <div>Past Subscriptions</div>
      <SubscriptionsContainer type='cancelled'/>
    </div>
  );
};

export default Past;
