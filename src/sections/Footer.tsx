const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Footer = () => {
  return (
    <div className="bg-[#622409] relative flex flex-col items-center justify-center pt-[60px] pb-[33px] w-full z-[120] overflow-x-hidden">
  <div className="flex items-end justify-center flex-wrap md:gap-[68px] gap-4 min-h-[171px] h-auto w-full">
    <img
      src="/images/footer-cat.webp"
      className="aspect-[0.86/1] object-contain"
      style={{width: "clamp(147px, 19.14vw, 269.5px)"}}
    />
    <p  
  className="font-Rainball text-white"
  style={{ 
    fontSize: "clamp(74px, 14.45vw, 185px)", 
    lineHeight: "clamp(48px, 9.38vw, 120px)" 
  }}
>
  Meowfi
</p>



  </div>
  <ul className="flex flex-wrap items-center justify-center gap-y-[8px] gap-[28px] mt-[76px] w-full">
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
