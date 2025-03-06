import React, { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    localStorage.removeItem("connectedWallet"); // Clear wallet from memory
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <nav className="pt-[40px] overflow-x-hidden z-50 relative">
      {/* Desktop Nav */}
      <div className="lg:flex hidden items-center justify-between w-full px-6">
        <div />
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li className="navlink cursor-pointer" key={link.title}>
              <a className="font-Rainball text-[19px] text-white tracking-[-1%]" href={link.path}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <Button
          onClick={isConnected ? handleDisconnect : connectWallet}
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 py-2 flex items-center gap-2 w-[152.42px]"
          variant="default"
        >
          <Wallet className="h-5 w-5" />
          {isConnected ? formatAddress(address || "") : "Connect Wallet"}
        </Button>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="lg:hidden absolute top-10 right-10 z-[9000]">
        <button onClick={toggleNavbar} className="text-white focus:outline-none">
          {isOpen ? <X size={24} className="text-orange-500" /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navbar Links for Mobile */}
      <ul
        className={`flex items-center gap-6 flex-col lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "fixed inset-0 bg-white h-screen justify-center z-[5000] opacity-100 visible" : "hidden opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <li className="navlink cursor-pointer" key={link.title}>
            <a
              className="font-Rainball text-[19px] text-white tracking-[-1%] hover:text-orange-500 transition-colors duration-200"
              href={link.path}
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </a>
          </li>
        ))}

        <li className="mt-6">
          <Button
            onClick={() => {
              isConnected ? handleDisconnect() : connectWallet();
              setIsOpen(false);
            }}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 py-2 flex items-center gap-2"
            variant="default"
          >
            <Wallet className="h-5 w-5" />
            {isConnected ? formatAddress(address || "") : "Connect Wallet"}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
