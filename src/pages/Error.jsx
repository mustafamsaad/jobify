/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="404 Error" />
        <h3>Obs! Page does not found!</h3>
        <p>We can't find the page you'r looking for</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
