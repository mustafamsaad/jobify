import { NavLink } from "react-router-dom";
import { MdOutlineWorkOutline, MdQueryStats } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { BsPersonVcard } from "react-icons/bs";

const links = [
  {
    id: 1,
    icon: <ImStatsDots />,
    title: "Stats",
    path: "/",
  },
  {
    id: 2,
    icon: <MdQueryStats />,
    title: "Add Job",
    path: "/add-job",
  },
  {
    id: 3,
    icon: <MdOutlineWorkOutline />,
    title: "All Jobs",
    path: "/all-jobs",
  },
  {
    id: 4,
    icon: <BsPersonVcard />,
    title: "Profile",
    path: "/profile",
  },
];

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, icon, title, path } = link;

        return (
          <NavLink
            key={id}
            to={path}
            onClick={toggleSidebar}
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            <span className="icon">{icon}</span>
            {title}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
