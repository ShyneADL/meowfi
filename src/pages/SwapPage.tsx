import { Swap } from "@/sections/Swap";
import { useWallet } from "@/hooks/use-wallet";

const SwapPage = () => {
  const { isConnected } = useWallet();
  return (
    <main className="flex items-center justify-end w-full h-screen">
      <Swap />
    </main>
  );
};

export default SwapPage;
