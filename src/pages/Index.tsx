import {Swap}from "@/sections/Swap";
import HTB from "@/sections/HTB";
import About from "@/sections/About";
import InfiniteSlider from "@/sections/InfiniteSlider";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";
import { useWallet } from "@/hooks/use-wallet";

const Index = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Hero />
      <InfiniteSlider />
      <About />
      <HTB />
      <Swap /> 
      <Footer />
    </div>
  );
};

export default Index;
