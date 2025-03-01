import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons from lucide-react

const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="pt-[40px] overflow-x-hidden z-50">
      {/* Desktop Nav */}
      <ul className="flex items-center gap-6 justify-center w-full">
      {navLinks.map((link) => (
          <li className="navlink cursor-pointer" key={link.title}>
            <a
              className="font-Rainball text-[19px] text-white tracking-[-1%]"
              href={link.path}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden absolute top-10 right-10 z-[9000]">
        <button
          onClick={toggleNavbar}
          className="text-white focus:outline-none"
        >
          {isOpen ? (
            <X size={24} className="text-orange-500" /> // Use className for styling
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Navbar Links */}
      <ul
        className={`flex items-center gap-6 justify-center w-full md:flex transition-all duration-300 ease-in-out ${
          isOpen
            ? "fixed inset-0 bg-white flex-col h-screen justify-center z-[5000] opacity-100 visible"
            : "hidden opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <li className="navlink cursor-pointer" key={link.title}>
            <a
              className="font-Rainball text-[19px] text-white tracking-[-1%] hover:text-orange-500 transition-colors duration-200"
              href={link.path}
              onClick={() => setIsOpen(false)} // Close navbar when a link is clicked
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;