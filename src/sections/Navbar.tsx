const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Navbar = () => {
  return (
    <nav className="pt-[40px]">
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
    </nav>
  );
};

export default Navbar;
