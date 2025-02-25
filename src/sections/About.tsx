import React from "react";

const About = () => {
  return (
    <div className="bg-[#F4F4F4] flex items-start justify-between px-20 pt-[30px] h-[70vh] w-full">
      <div className="relative h-[190px]">
        <h2 className="font-Rainball font-normal text-[85.22px] about leading-[85.22px] tracking-[-1%]">
          About Us
        </h2>
        <img
          src="/images/arrow.png"
          className="relative bottom-0 xl:left-20 left-0 w-[275px] h-[113px]"
        />
      </div>
      <div className="about-box">
        <p className="font-Veritas font-medium text-[21px] leading-[27px] text-White w-full">
          As a project, Memecat’s mission is simple: to free memes from the
          clutches of Web2 algorithms and give them back to the community.{" "}
        </p>
        <p className="font-Veritas font-medium text-[21px] leading-[27px] text-White w-full">
          Unlike Web2 platforms, where memes vanish or are stolen, Memecat
          offers true ownership with mintable, tradeable NFTs, and rewards
          creators through $MEOW, our native memecoin. Every like, share, and
          laugh adds value to the decentralized meme economy.{" "}
        </p>
        <p className="font-Veritas font-medium text-[21px] leading-[27px] text-White w-full">
          From Meow Battles to community governance, Memecat transforms memes
          into assets, ensuring they stay immortal on the blockchain.
        </p>
      </div>
    </div>
  );
};

export default About;
