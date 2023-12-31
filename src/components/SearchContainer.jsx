import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "../components";
import { useAppContext } from "../context/appContext";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    statusOptions,
    jobTypeOptions,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;

    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            changeHandler={handleSearch}
          ></FormRow>
          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            name="searchStatus"
            value={searchStatus}
            changeHandler={handleSearch}
            list={["all", ...statusOptions]}
          ></FormRowSelect>
          {/* search by type */}

          <FormRowSelect
            labelText="job type"
            name="searchType"
            value={searchType}
            changeHandler={handleSearch}
            list={["all", ...jobTypeOptions]}
          ></FormRowSelect>
          {/* sort */}

          <FormRowSelect
            name="sort"
            value={sort}
            changeHandler={handleSearch}
            list={sortOptions}
          ></FormRowSelect>
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
