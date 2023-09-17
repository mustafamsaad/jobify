import Wrapper from "../assets/wrappers/SmallSidebar";
import { useAppContext } from "../context/appContext";
import { GrClose } from "react-icons/gr";
import Logo from "./Logo";
import { NavLinks } from "./";

const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && "show-sidebar"}`}>
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <GrClose />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
