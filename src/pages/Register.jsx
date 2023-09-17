import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo, Alert } from "../components";
import { useAppContext } from "../context/appContext.jsx";
import { DISPLAY_ALERT } from "../context/actions";

const initialState = {
  email: "",
  name: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, isLoading, showAlert, dispatchAlert, setupUser } =
    useAppContext();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues((prevState) => ({
      ...prevState,
      isMember: !prevState.isMember,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, name, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatchAlert({ type: DISPLAY_ALERT });
      return;
    }

    const currentUser = { email, password, name };

    if (isMember) {
      setupUser(currentUser, "login", "Logged in successfully, redirecting...");
    } else {
      setupUser(
        currentUser,
        "register",
        "User created successfully, redirecting..."
      );
    }
  };

  const changeHandler = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={submitHandler}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            value={values.name}
            name="name"
            type="name"
            changeHandler={changeHandler}
          />
        )}
        <FormRow
          value={values.email}
          name="email"
          type="text"
          changeHandler={changeHandler}
        />
        <FormRow
          value={values.password}
          name="password"
          type="password"
          changeHandler={changeHandler}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
