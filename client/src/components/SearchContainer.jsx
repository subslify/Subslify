import { useState, useEffect } from 'react';
import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import '../assets/styles/search-container.scss';
import { getSubscriptions } from '../../../server/src/controllers/subscriptionsController';

const SearchContainer = ({ type }) => {
  const { isLoading, search, sortOptions, clearFilters, getSubscriptions } =
    useAppContext();

  const handleChange = (event) => {
    search[type].searchTerm = event.target.value;
  };

  const [searchTerm, setSearchTerm] = useState(search[type].searchTerm);

  const [sort, setSort] = useState(search[type].sort);

  useEffect(() => {
    search[type].searchTerm = searchTerm;
    getSubscriptions({ type, sort });
  }, [searchTerm, sort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm('');
    clearFilters();
  };

  const currentSearch = search[type];

  console.log(currentSearch);
  return (
    <section className='search-container'>
      <h4>Search</h4>
      <div className='form-center'>
        <FormRow
          type='text'
          name='Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormRowSelect
          name='subscriptionType'
          labelText='Subscription Type'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          list={sortOptions}
        />
        <button className='btn btn-block btn-danger' onClick={handleSubmit}>
          Clear
        </button>
      </div>
    </section>
  );
};

export default SearchContainer;
