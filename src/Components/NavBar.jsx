import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-11/12 flex md:hidden m-auto justify-between items-center mb-14 pt-3">
        <div>
          <img src={logo} alt="React Logo" />
        </div>
        <div className="flex justify-evenly w-6/12 text-base font-normal">
          <Link to="/">Home</Link>
          <Link to="/our-services">Our Services</Link>
          <Link to="/women-health">Women Health</Link>
          <Link to="/about-us">About Us</Link>
        </div>

        <div>
          <Link to="/sign-in">
            <button className="lgn-button w-[120px] px-1 py-3 text-xs">
              Login
            </button>
          </Link>
        </div>
      </nav>

      <nav className="w-11/12 hidden md:flex m-auto justify-between items-center mb-14 pt-3 ">
        <div className="w-1/3">
          <GiHamburgerMenu
            className="cursor-pointer"
            size={24}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="flex items-start absolute top-0 left-0 footer-bg px-5 py-3 z-40 w-full justify-between text-base text-white font-normal">
            <div className="flex flex-col">
              <Link to="/" className="mb-2">
                Home
              </Link>
              <Link to="/our-services" className="mb-2">
                Our Services
              </Link>
              <Link to="/women-health" className="mb-2">
                Women Health
              </Link>
              <Link to="/about-us" className="mb-2">
                About Us
              </Link>
            </div>
            <div>
              <MdClose
                className=" cursor-pointer translate-x-2"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
        <div className="w-1/3">
          <img
            src={logo}
            alt="React Logo"
            width={200}
            className="text-right w-full h-full"
          />
        </div>

        <div className="w-1/3 text-right">
          <Link to="/sign-in">
            <button className="lgn-button w-[95px] py-1.5 px-0.5 md:text-xs md:py-1 md:-ml-2">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
