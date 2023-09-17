import { Alert, FormRow, FormRowSelect } from "../../components";

import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    editJob,
    showAlert,
    position,
    company,
    jobLocation,
    dispatchAlert,
    jobTypeOptions,
    statusOptions,
    jobType,
    status,
    handleChange,
    clearValues,
    createJob,
  } = useAppContext();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      dispatchAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            value={company}
            changeHandler={changeHandler}
          />
          <FormRow
            type="text"
            name="position"
            value={position}
            changeHandler={changeHandler}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            value={jobLocation}
            changeHandler={changeHandler}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            changeHandler={changeHandler}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="status"
            value={status}
            changeHandler={changeHandler}
            list={statusOptions}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={submitHandler}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
