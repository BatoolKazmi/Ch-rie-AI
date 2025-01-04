import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoWhite.svg";

// find products in the navbar

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src={Logo} alt="logo" className="w-20 h-auto" />
      </NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/test">Find Products</NavLink>
    </nav>
  );
}

export default NavBar;
