const FormRow = ({ type, value, name, changeHandler, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        className="form-input"
        onChange={changeHandler}
      />
    </div>
  );
};
export default FormRow;
