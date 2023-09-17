import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
const Navbar = () => {
  const { user, toggleSidebar, logout } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            className="btn"
            onClick={() => setShowDropdown((prevState) => !prevState)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showDropdown && "show-dropdown"}`}>
            <button onClick={logout} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
