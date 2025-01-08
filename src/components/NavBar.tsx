import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoWhite.svg";
import { Button } from "@/components/ui/button";
import Logo_png from "../assets/cherie_logo.png";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { IoMenu } from "react-icons/io5";
import { Theme } from "@chakra-ui/react"


// find products in the navbar

function NavBar() {
  return (
    <div className="navbar flex flex-row justify-between items-center px-[5%] h-[5rem] bg-white sticky top-0 z-50 py-2 border-b-[1px] border-solid border-black" >
      <div className="logo-div">
        <NavLink to="/">
          <img src={Logo_png} alt="logo" className=" max-h-[5rem] sm:max-w-[8rem] sm:max-h-[6.5rem]" />
        </NavLink>
      </div>
      <div className="headings nav-heading bg-black">
        <div className="menu  bg-slate-200 ">
          <MenuRoot>
            <MenuTrigger asChild className="w-10">
              <Theme appearance="light">
                <Button variant="outline" size="2xl">
                  <IoMenu className="text-xl"/>
                </Button>
              </Theme>
            </MenuTrigger>
            <MenuContent>
              <Theme appearance="light">
                <MenuItem asChild value="Home" className="px-4 py-4 text-lg">
                  <NavLink to="/">Home</NavLink>
                </MenuItem>
                <MenuItem asChild value="Find Products" className="px-4 py-4 text-lg">
                  <NavLink to="/test">Find Products</NavLink>
                </MenuItem>   
              </Theme>  
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
