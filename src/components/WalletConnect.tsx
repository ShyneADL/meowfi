import { useState } from "react";
import { Wallet, ChevronDown, LogOut, ExternalLink } from "lucide-react";
import { useWeb3Provider } from "../utils/web3";
import { getEthBalance, getTokenBalance, TOKEN_INFO } from "../utils/tokenContract";
import { useEffect } from "react";
interface WalletConnectProps {
  minimal?: boolean;
}
const WalletConnect = ({ minimal = false }: WalletConnectProps) => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet, provider } = useWeb3Provider();
  const [isOpen, setIsOpen] = useState(false);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  // Short address display
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  // Fetch balances when connected
  useEffect(() => {
    const fetchBalances = async () => {
      if (isConnected && account && provider) {
        const eth = await getEthBalance(account, provider);
        setEthBalance(eth);
        
        const token = await getTokenBalance(account, provider);
        setTokenBalance(token?.formattedBalance || null);
      } else {
        setEthBalance(null);
        setTokenBalance(null);
      }
    };
    fetchBalances();
    
    // Refresh balances every 30 seconds
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, [isConnected, account, provider]);
  // Not connected state
  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`btn-primary rounded-full flex items-center justify-center transition-all ${
          isConnecting ? "opacity-70 cursor-not-allowed" : ""
        } ${
          minimal ? "px-3 py-1.5 text-sm" : "px-6 py-2.5"
        }`}
      >
        <Wallet size={minimal ? 16 : 18} className={minimal ? "mr-1" : "mr-2"} />
        <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
      </button>
    );
  }
  // Connected & minimal state (mobile)
  if (minimal) {
    return (
      <button
        onClick={toggleDropdown}
        className="relative btn-secondary rounded-full px-3 py-1.5 text-sm flex items-center"
      >
        <span className="w-2 h-2 absolute top-1 left-1 rounded-full bg-green-500 animate-pulse" />
        <span className="pl-2 font-mono">{account ? shortenAddress(account) : "Connected"}</span>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg shadow-glass overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-muted-foreground">Connected Wallet</p>
              <a 
                href={`https://sepolia.etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono flex items-center hover:text-primary transition-colors"
              >
                {shortenAddress(account || "")}
                <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
            
            <div className="px-4 py-2">
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className="flex justify-between items-center">
                <div className="text-sm">{ethBalance ? parseFloat(ethBalance).toFixed(4) : "0.0000"} ETH</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm">{tokenBalance ? parseFloat(tokenBalance).toFixed(2) : "0.00"} {TOKEN_INFO.symbol}</div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                disconnectWallet();
                closeDropdown();
              }}
              className="w-full px-4 py-2 text-left flex items-center text-sm hover:bg-black/5 transition-colors border-t border-white/10"
            >
              <LogOut size={14} className="mr-2" />
              Disconnect
            </button>
          </div>
        )}
      </button>
    );
  }
  // Connected state (desktop)
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="btn-secondary rounded-full px-5 py-2.5 flex items-center"
      >
        <span className="w-2 h-2 absolute top-2.5 left-2.5 rounded-full bg-green-500 animate-pulse" />
        <span className="pl-3 font-mono">{account ? shortenAddress(account) : "Connected"}</span>
        <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 glass rounded-lg shadow-glass overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-muted-foreground">Connected Wallet</p>
              <a 
                href={`https://sepolia.etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono flex items-center hover:text-primary transition-colors"
              >
                {account}
                <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
            
            <div className="px-4 py-3">
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className="flex justify-between items-center">
                <div className="text-sm">{ethBalance ? parseFloat(ethBalance).toFixed(4) : "0.0000"} ETH</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm">{tokenBalance ? parseFloat(tokenBalance).toFixed(2) : "0.00"} {TOKEN_INFO.symbol}</div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                disconnectWallet();
                closeDropdown();
              }}
              className="w-full px-4 py-3 text-left flex items-center text-sm hover:bg-black/5 transition-colors border-t border-white/10"
            >
              <LogOut size={14} className="mr-2" />
              Disconnect
            </button>
          </div>
        )}
      </button>
    </div>
  );
};
export default WalletConnect;