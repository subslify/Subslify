import { useState } from 'react';
import '../assets/styles/search.scss';
import { useAppContext } from '../context/appContext';

const Search = (props) => {
  const [search, setSearch] = useState({
    value: ''
  });

  const { getSubscriptions } = useAppContext();

  const handleSubmit = () => {
    event.preventDefault();
    getSubscriptions({type: props.type, sort: null, search: search.value})
  };
  const handleChange = event => {
    setSearch({value: event.target.value});
  };

  return (
    <div className='search-container'>
      <form className='search' onSubmit={handleSubmit}>
        <input
          className='search-input'
          type='text'
          value={search.value}
          placeholder='Search...'
          onChange={handleChange}
        />
        <button type='submit'>
          <i className='fa-search'></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
