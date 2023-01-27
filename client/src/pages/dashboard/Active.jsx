import { useAppContext } from '../../context/appContext';
import SubscriptionsContainer from '../../components/SubscriptionsContainer';
import '../../assets/styles/search.scss';

const Active = () => { 
  return (
    <div>
      <div>Active Subscriptions</div>
      <SubscriptionsContainer type='active'/>
    </div>
  );
};

export default Active;