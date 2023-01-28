import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import SubscriptionInfo from './SubscriptionInfo';
import '../assets/styles/subscription.scss';
import { FaCalendarAlt } from 'react-icons/fa';

const Subscription = ({
  name,
  price,
  frequency,
  startDate,
  status,
  _id,
  type,
}) => {
  const { setEditSubscription, deleteSubscription } = useAppContext();

  const date = moment(startDate).format('Do MMM');

  //   name,
  // price,
  // frequency,
  // startDate,
  // user,
  // status,
  // endDate,
  // logoUrl,
  // notes,
  return (
    <article className='subscription'>
      <header>
        <div className='main-icon'>{name.charAt(0).toUpperCase()}</div>
        <div className='info'>
          <h5>{name}</h5>
          <p>Price: ${price}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <SubscriptionInfo icon={<FaCalendarAlt />} text={frequency} />
          <SubscriptionInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-subscription'
              onClick={() => setEditSubscription(_id, (type = status))}
              className='btn edit-btn'
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteSubscription(_id, (type = status))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Subscription;
