import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/test">Test</NavLink>
    </nav>
  );
}

export default NavBar;
