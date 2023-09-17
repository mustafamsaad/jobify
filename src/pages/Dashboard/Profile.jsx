import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, dispatchAlert, showAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [lastName, setLastName] = useState(user?.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !location || !lastName) {
      dispatchAlert();
      return;
    }

    updateUser({ name, email, location, lastName });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            value={name}
            name={"name"}
            labelText={"name"}
            changeHandler={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            value={lastName}
            name={"last-name"}
            labelText={"Last Name"}
            changeHandler={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            value={email}
            name={"email"}
            labelText={"Email"}
            changeHandler={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            value={location}
            name={"location"}
            labelText={"Location"}
            changeHandler={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait... " : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
