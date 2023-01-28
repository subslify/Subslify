import '../assets/styles/subscription-info.scss';

const SubscriptionInfo = ({ icon, text }) => {
  return (
    <div className='subscription-info'>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </div>
  );
};

export default SubscriptionInfo;
