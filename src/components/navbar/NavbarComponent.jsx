import { Button, Navbar } from "flowbite-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

export function NavbarComponent() {
  // const totalItems = useSelector((state) => state?.cart?.totalItems);
  // console.log("totalItems", totalItems);
  // const location = useLocation();
  // const pathname = location?.pathname;
  // const totalItems = useSelector(selectTotalItems);
  // console.log("totalItems", totalItems);
  // console.log(pathname);
  // console.log("location", location);
  const [navbarList, setNavbarList] = useState([
    { title: "Home", path: "/" },
    { title: "Count", path: "/count" }
  ]);

  return (
    <h1>
      Hello
    </h1>
    // <Navbar fluid rounded>
    //   <Navbar.Brand>
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       React Toolkit
    //     </span>
    //   </Navbar.Brand>
    //   <div className="flex md:order-2 items-center ">
    //     <Link to="/cart" className="relative">
    //       <FaCartPlus className="mr-5" />
    //       <span className="absolute -top-4 right-1 text-cyan-700 font-semibold">
    //         {totalItems}
    //       </span>
    //     </Link>

    //     <Button as={Link} to={"/login"}>
    //       Login
    //     </Button>
    //     <Navbar.Toggle />
    //   </div>
    //   <Navbar.Collapse>
    //     {navbarList?.map((item, index) => {
    //       return (
    //         <Navbar.Link
    //           key={index}
    //           as={Link}
    //           to={item.path}
    //           active={pathname === item.path}
    //         >
    //           {item.title}
    //         </Navbar.Link>
    //       );
    //     })}
    //   </Navbar.Collapse>
    // </Navbar>
  );
}
