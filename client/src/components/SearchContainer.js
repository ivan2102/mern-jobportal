import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

const SearchContainer = () => {

const [localSearch, setLocalSearch] = useState('')

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (event) => {
    handleChange({ name: event.target.name, value: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalSearch('');
    clearFilters();
  };

  //debounce search
  const debounce = () => {

    let timeoutID;

    return (event) => {

      setLocalSearch(event.target.value)

      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => {

        handleChange({ name: event.target.name, value: event.target.value });

      }, 1000)
    }
  }

  const searchingDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>

        {/* search */}
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={ searchingDebounce }
          />

          {/*status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block"
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
