import { useState, useEffect } from "react";
import { ArrowDown, RefreshCw, AlertCircle } from "lucide-react";
import { useWeb3Provider } from "../utils/web3";
import { TOKEN_INFO, getCurrentTokenPrice, swapEthForTokens } from "../utils/tokenContract";
import { toast } from "sonner";
const SwapInterface = () => {
  const { account, isConnected, connectWallet, signer } = useWeb3Provider();
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [priceImpact, setPriceImpact] = useState("0.00");
  
  // Current price from our mock data
  const tokenPrice = getCurrentTokenPrice();
  
  // Handle ETH input change
  const handleEthChange = (value: string) => {
    if (value === "") {
      setEthAmount("");
      setTokenAmount("");
      return;
    }
    
    // Filter out non-numeric and multiple dots
    const filteredValue = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setEthAmount(filteredValue);
    
    // Calculate token amount (1 ETH = 1000 MOON tokens, simplified example)
    const calculatedTokens = parseFloat(filteredValue) / tokenPrice;
    setTokenAmount(isNaN(calculatedTokens) ? "" : calculatedTokens.toFixed(2));
    
    // Calculate price impact (this is simplified, real DEXs use more complex calculations)
    const impact = parseFloat(filteredValue) * 0.05; // 0.5% price impact for example
    setPriceImpact(impact.toFixed(2));
  };
  
  // Handle token input change
  const handleTokenChange = (value: string) => {
    if (value === "") {
      setTokenAmount("");
      setEthAmount("");
      return;
    }
    
    // Filter out non-numeric and multiple dots
    const filteredValue = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setTokenAmount(filteredValue);
    
    // Calculate ETH amount
    const calculatedEth = parseFloat(filteredValue) * tokenPrice;
    setEthAmount(isNaN(calculatedEth) ? "" : calculatedEth.toFixed(6));
    
    // Calculate price impact
    const impact = parseFloat(filteredValue) * tokenPrice * 0.05; // 0.5% price impact
    setPriceImpact(impact.toFixed(2));
  };
  
  // Handle swap
  const handleSwap = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsSwapping(true);
    
    try {
      // Call the swap function
      const success = await swapEthForTokens(signer, ethAmount);
      
      if (success) {
        // Clear form on success
        setEthAmount("");
        setTokenAmount("");
      }
    } catch (error) {
      console.error("Swap error:", error);
      toast.error("An error occurred during the swap");
    } finally {
      setIsSwapping(false);
    }
  };
  
  // Swap button text based on state
  const getSwapButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (isSwapping) return "Swapping...";
    if (!ethAmount || parseFloat(ethAmount) <= 0) return "Enter an amount";
    return "Swap";
  };
  
  return (
    <section id="swap" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto animate-slide-up">
          <div className="rounded-2xl p-1 bg-gradient-to-r from-primary to-primary/50">
            <div className="glass rounded-xl p-6 shadow-glass border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Swap</h2>
                <button className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors">
                  <RefreshCw size={18} />
                </button>
              </div>
              
              {/* ETH Input */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-2">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-muted-foreground">You Pay</label>
                  <div className="text-xs text-muted-foreground">
                    Balance: 0.00 ETH
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ethAmount}
                    onChange={(e) => handleEthChange(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent border-none text-xl font-medium focus:outline-none focus:ring-0"
                  />
                  
                  <div className="flex items-center bg-white/20 px-3 py-1 rounded-lg">
                    <img 
                      src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69d3f/eth-diamond-glyph.webp" 
                      alt="ETH" 
                      className="w-5 h-5 mr-2"
                    />
                    <span className="font-medium">ETH</span>
                  </div>
                </div>
              </div>
              
              {/* Swap Icon */}
              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-background w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                  <ArrowDown size={18} className="text-primary" />
                </div>
              </div>
              
              {/* Token Input */}
              <div className="bg-secondary/50 rounded-xl p-4 mt-2">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-muted-foreground">You Receive</label>
                  <div className="text-xs text-muted-foreground">
                    Balance: 0.00 {TOKEN_INFO.symbol}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tokenAmount}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent border-none text-xl font-medium focus:outline-none focus:ring-0"
                  />
                  
                  <div className="flex items-center bg-white/20 px-3 py-1 rounded-lg">
                    <span className="mr-2">🌙</span>
                    <span className="font-medium">{TOKEN_INFO.symbol}</span>
                  </div>
                </div>
              </div>
              
              {/* Price and Slippage Info */}
              {ethAmount && parseFloat(ethAmount) > 0 && (
                <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span>1 ETH = {(1 / tokenPrice).toFixed(2)} {TOKEN_INFO.symbol}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-muted-foreground">Price Impact</span>
                    <span className="text-yellow-600">~{priceImpact}%</span>
                  </div>
                </div>
              )}
              
              {/* Note that this is a testnet */}
              <div className="mt-4 text-xs flex items-start text-muted-foreground">
                <AlertCircle size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                <p>
                  This is a demo running on Sepolia testnet. The trades are simulated and don't use real ETH.
                </p>
              </div>
              
              {/* Swap Button */}
              <button
                onClick={handleSwap}
                disabled={isSwapping || (!ethAmount || parseFloat(ethAmount) <= 0)}
                className={`w-full mt-4 rounded-xl py-4 font-semibold transition-all ${
                  isConnected && ethAmount && parseFloat(ethAmount) > 0
                    ? "btn-primary"
                    : "bg-primary/70 text-primary-foreground cursor-not-allowed"
                }`}
              >
                {getSwapButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SwapInterface;