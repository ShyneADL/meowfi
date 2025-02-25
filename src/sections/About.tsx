import React from "react";

const About = () => {
  return (
    <div className="relative flex items-start justify-between px-20 pt-[30px] h-[100vh] overflow-hidden w-full">
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
      <div className="absolute bottom-0 left-0 w-full h-[553px] ">
        <img
          src="/images/left-cat.png"
          className="absolute left-0 bottom-0 z-[0]"
          style={{ width: "clamp(180px, 23.36vw, 389px)", height: "auto" }}
        />
        <img
          src="/images/left-hill.png"
          className="absolute left-0 bottom-0 z-[2]"
          style={{ width: "clamp(400px, 63.6vw, 1058px)", height: "auto" }}
        />
        <img
          src="/images/right-cat.png"
          className="absolute right-[20%] translate-x-[-20%] bottom-0 z-[3]"
          style={{ width: "clamp(150px, 18.75vw, 289px)", height: "auto" }}
        />
        <img
          src="/images/right-hill.png"
          className="absolute right-0 bottom-0 z-[1]"
          style={{ width: "clamp(400px, 63.3vw, 1053px)", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default About;
