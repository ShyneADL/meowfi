import Navbar from "./Navbar";
import tg from "/images/tg.webp";
import x from "/images/x.webp";
import dc from "/images/dc.webp";

const icons = [
  {
    icon: x,
    alt: "Discord",
  },
  {
    icon: tg,
    alt: "Telegram",
  },
  {
    icon: dc,
    alt: "Twitter",
  },
];

const Hero = () => {
  return (
    <div className=" relative hero w-full h-[100vh] overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col items-start gap-6 mt-[82px] lg:px-[100px] md:px-[60px] px-6 z-[2]">
        <h1 className="font-Rainball text-white leading-[90%] tracking-[-1%] max-w-[1031px] w-full z-[2]">
          MEOWFI: The Future of{" "}
          <span className="inline-flex flex-col text-black relative clip">
            <p className="text-primary-500">Memechain</p>
            <p className="text-primary-500 absolute top-[100%]">is Here!</p>
          </span>
        </h1>
        <p className="font-Inter font-light text-[25px] text-White max-w-[538px] w-full z-[2]">
          Memes were never meant to be owned by algorithms. Now, they belong to
          the community.
        </p>
        <div className="flex items-center gap-4 mt-9">
          <button className="buy-btn rounded-[100px] p-[4px]">
            <div className="bg-primary-100 font-Rainball text-black text-2xl tracking-[-1%] rounded-[100px] py-[15px] px-[102px]">
              <p className="w-[105px]">Buy Meowfi</p>
            </div>
          </button>
          {icons.map((icon) => (
            <img className="size-[48.56px]" src={icon.icon} alt={icon.alt} />
          ))}
        </div>
        <img
          src="/images/cat-hero.webp"
          className="absolute right-[40px] -bottom-[0px] z-[1] object-contain"
          style={{
            width: "clamp(510px, 40vw, 800px)", // Scales between 510px and 800px
            height: "auto", // Maintains aspect ratio
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
