import { Search, Sort } from '../../components';
import { useAppContext } from '../../context/appContext';
import '../../assets/styles/search.scss';

const Active = () => { 
  return (
    <div>
      <div>Active Subscriptions</div>
        {/* add a div container to contain the search filter and sort components w/ className for styling*/}
      <div className='search-sort-container'>
        <Search type='active'/>
        <Sort type='active'/>
      </div>

      {/* render all cards that have been mapped to an array and/or retrieved from state/contexAPI */}
    </div>
  );
};

export default Active;