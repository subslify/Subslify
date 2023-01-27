import SubscriptionsContainer from '../../components/SubscriptionsContainer';
import { useAppContext } from '../../context/appContext';
import '../../assets/styles/search.scss';

const Trial = () => {
  return (
    <div>
      <div>Trial Subscriptions</div>
      <SubscriptionsContainer type='trial'/>
    </div>
  );
};

export default Trial;
