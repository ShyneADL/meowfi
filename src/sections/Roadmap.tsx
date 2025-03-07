const roadmap = [
  {
    id: 1,
    options: [
      "• Launch MeowFi Platform: Enable meme minting and trading as NFTs.",
      "• Deploy $MEOW Token: The core of the memetic economy.",
      "• Establish the MeowDAO: Community governance begins.",
      "• Host the first Meow Battle: Meme creators compete for rewards.",
    ],
  },
  {
    id: 2,
    options: [
      "• Introduce Meme Staking: Earn $MEOW by staking viral content.",
      "• Launch Meow Marketplace: Trade, buy, and sell memes on-chain.",
      "• Partner with meme creators & influencers to onboard new users.",
      "• Integrate IPFS for decentralized meme storage.",
    ],
  },
  {
    id: 3,
    options: [
      "• Roll out Meme Royalty System: Reward creators for viral content shared across platforms.",
      "• Introduce Custom Meme Collections: Enable exclusive NFT drops.",
      "• Expand ecosystem with Memetic APIs for dApp integrations.",
      "• Begin MeowFi Mobile App development for easy access.",
    ],
  },
];

const Roadmap = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-screen-xl flex flex-col items-center">
        <h2
          className="font-Rainball font-normal about tracking-[-1%] mb-4"
          style={{
            fontSize: "clamp(51.13px, 6.66vw, 93.74px)",
          }}
        >
          Roadmap
        </h2>
        <p className="text-[24px] font-Veritas text-center max-w-[826px] mb-20 w-full">
          Memecat is shaping the future of memes step by step. From freeing
          memes to creating a thriving decentralized economy, our roadmap is a
          guide to eternal dankness. Join us as we turn memes into unstoppable
          cultural assets.
        </p>
        <div className="flex items-center flex-wrap gap-4">
          {roadmap.map((phase) => (
            <div
              key={phase.id}
              className="bg-white p-6 rounded-[20px] shadow-md"
            >
              <div className="stage-box absolute -top-10 left-[50%] -translate-x-[50%]">
                <h3 className="font-Rainball text-white text-[41px]">
                  Stage {phase.id}
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {phase.options.map((option, index) => (
                  <li key={index} className="text-gray-700">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
