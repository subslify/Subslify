import { Search, Sort } from '../../components';
import { useAppContext } from '../../context/appContext';
import '../../assets/styles/search.scss';

const Past = () => {
  return (
    <div>
      <div>Past Subscriptions</div>
      <div className="search-container">
        <Search />
        <Sort />
      </div>
    </div>
  );
};

export default Past;
