import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoWhite.svg";

function NavBar() {
  return (
    <nav className="navbar">
      <img src={Logo} alt="logo" className="w-20 h-auto" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/test">Test</NavLink>
      <NavLink to="/camera">Camera</NavLink>
    </nav>
  );
}

export default NavBar;
