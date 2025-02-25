const htbDetails = [
  {
    id: 0,
    title: "Get a Wallet",
    desc: "Set up a crypto wallet like metamask or trust wallet and add funds (ETH or BNB).",
    image: "/images/wood-1.webp",
  },
  {
    id: 1,
    title: "Go to a DEX",
    desc: 'Visit Uniswap or PancakeSwap, connect your wallet, and paste the official <span class="font-bold">$MEOW</span> contract address.',
    image: "/images/wood-3.webp",
  },
  {
    id: 2,
    title: "Get a Wallet",
    desc: 'Enter the amount, complete the swap, and enjoy your <span class="font-bold">$MEOW</span> token',
    image: "/images/wood-1.webp",
  },
];

const HTB = () => {
  return (
    <div className="relative top-[-25px] flex flex-col items-start htb-bg h-[100vh] px-[73px] pt-[39px] flex-1 w-full z-50">
      <h3 className="font-Rainball text-[57px] leading-[130%] tracking-[-1%] text-White rotate-[-6.55deg] mt-4 2xl:mt-8">
        How to Buy $meow
      </h3>
      <div className="flex items-row gap-2 items-start justify-center w-full">
        {htbDetails.map((item) => (
          <div className="relative w-[360px] h-[685px] z-20">
            <img
              src={item.image}
              alt={item.title}
              className="flex-1 object-contain"
            />
            <div className="absolute top-[40%] -translate-y-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-[304px] gap-5">
              <h4 className="font-Inter font-bold text-[28px] leading-[111%] text-[#030202]">
                {item.title}
              </h4>
              <p
                className="font-Inter font-normal text-[21px] leading-[111%] text-black"
                dangerouslySetInnerHTML={{ __html: item.desc }}
              />
            </div>
          </div>
        ))}
        <img
          src="/images/htb-bottom.svg"
          alt="htb-bottom"
          className=" lg:flex hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[981px] h-[135px] z-10"
        />
      </div>
    </div>
  );
};

export default HTB;
