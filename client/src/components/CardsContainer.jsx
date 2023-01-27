import { useAppContext } from '../context/appContext';

const CardsContainer = () => {
  const { subscriptions } = useAppContext();
  return (
    <div>
        Subscriptions
    </div>
  );
};
export default CardsContainer;
