import { useNavigate } from "react-router-dom";

import main from "../assets/images/main-alternative.svg";

import Wrapper from "../assets/wrappers/LandingPage";

import { Logo } from "../components";

const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/register");
  };

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Meditation authentic meh hoodie keffiyeh hashtag kale chips 3 wolf
            moon truffaut skateboard. Biodiesel plaid palo santo, mukbang synth
            squid aesthetic kombucha man braid single-origin coffee marxism
            blackbird spyplane. Tbh affogato microdosing ugh. Sustainable
            jianbing cred fashion axe waistcoat cornhole tofu mustache activated
            charcoal shoreditch cold-pressed.
          </p>
          <button className="btn btn-hero" onClick={handleButtonClick}>
            Login/Register
          </button>
        </div>
        <img src={main} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
