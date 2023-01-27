import { Search, Sort }  from './';

const SearchSortContainer = (props) => {
  const { type, queryOptions, setQueryOptions } = props;
  return (
    <div className='search-sort-container'>
      {/* This needs to be made more efficient, no need to destructure and pass down this many times */}
      <Search
        type={type}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />
      <Sort
        type={type}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />
    </div>
  );
};

export default SearchSortContainer;
