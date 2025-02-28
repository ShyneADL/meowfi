const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Footer = () => {
  return (
    <div className="bg-[#622409] relative mt-[-80px] flex flex-col items-center justify-center pt-[60px] pb-[33px] w-full z-[120] overflow-x-hidden">
  <div className="flex items-end gap-[68px]">
    <img
      src="/images/footer-cat.webp"
      style={{ width: 'clamp(126px, 211px, 274px)', height: 'clamp(147px, 245px, 319px)' }}
      className="aspect-[0.86/1] object-contain"
    />
    <p 
      className="font-Rainball text-white h-[145px]" 
      style={{ fontSize: 'clamp(111px, 185px, 240px)' }}
    >
      Meowfi
    </p>
  </div>
  <ul className="flex items-center gap-[28px] mt-[76px]">
    {navLinks.map((link) => (
      <li key={link.title} className="text-white text-[18px] mt-4">
        <a href={link.path}>{link.title}</a>
      </li>
    ))}
  </ul>
  <button className="buy-btn rounded-[100px] p-[4px] mt-[40px]">
    <div className="bg-primary-100 font-Rainball text-black text-2xl tracking-[-1%] rounded-[100px] py-[15px] px-[102px]">
      <p className="w-[105px]">Buy Meowfi</p>
    </div>
  </button>
  <p className="font-Veritas text-sm leading-[130%] text-white mt-[30px]">@MEOWFI,2025, All Rights Reserved</p>
</div>

  
  );
};

export default Footer;
