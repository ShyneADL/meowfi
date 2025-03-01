import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from "sonner";
// Types
export interface Web3ProviderState {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
}
// The Sepolia testnet chain ID
const SEPOLIA_CHAIN_ID = 11155111;
// Networks
export const networks = {
  sepolia: {
    chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
    chainName: "Sepolia Testnet",
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sepolia.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};
// Initial state
export const initialWeb3State: Web3ProviderState = {
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};
// Utility function to get ethers provider
export const getProvider = async (): Promise<ethers.BrowserProvider | null> => {
  if (window.ethereum) {
    try {
      return new ethers.BrowserProvider(window.ethereum);
    } catch (error) {
      console.error("Failed to create provider:", error);
      return null;
    }
  }
  return null;
};
// Hook to manage Web3 connection
export const useWeb3Provider = () => {
  const [web3State, setWeb3State] = useState<Web3ProviderState>(initialWeb3State);
  // Function to handle connecting to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("No Ethereum wallet found. Please install MetaMask or another wallet.");
      return;
    }
    setWeb3State((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const provider = await getProvider();
      
      if (!provider) {
        throw new Error("Could not connect to Ethereum provider");
      }
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      if (chainId !== SEPOLIA_CHAIN_ID) {
        toast.warning("Please switch to the Sepolia testnet");
        try {
          await switchToSepolia();
        } catch (error) {
          console.error("Failed to switch network:", error);
        }
      }
      setWeb3State({
        provider,
        signer,
        account: accounts[0],
        chainId,
        isConnecting: false,
        isConnected: true,
        error: null,
      });
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Connection error:", error);
      setWeb3State({
        ...initialWeb3State,
        error: error instanceof Error ? error : new Error("Unknown connection error"),
      });
      toast.error("Failed to connect wallet");
    }
  };
  // Function to disconnect wallet
  const disconnectWallet = () => {
    setWeb3State(initialWeb3State);
    toast.info("Wallet disconnected");
  };
  // Function to switch to Sepolia network
  const switchToSepolia = async () => {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networks.sepolia.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networks.sepolia],
          });
        } catch (addError) {
          throw new Error("Failed to add Sepolia network");
        }
      } else {
        throw switchError;
      }
    }
  };
  // Listen for account and chain changes
  useEffect(() => {
    if (!window.ethereum || !web3State.isConnected) return;
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User has disconnected all accounts
        disconnectWallet();
      } else if (accounts[0] !== web3State.account) {
        // User has switched accounts
        setWeb3State((prev) => ({
          ...prev,
          account: accounts[0],
        }));
        toast.info("Account changed");
      }
    };
    const handleChainChanged = (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      setWeb3State((prev) => ({
        ...prev,
        chainId,
      }));
      
      if (chainId !== SEPOLIA_CHAIN_ID) {
        toast.warning("Please switch to the Sepolia testnet for full functionality");
      } else {
        toast.success("Connected to Sepolia testnet");
      }
    };
    const handleDisconnect = (error: { code: number; message: string }) => {
      console.error("Ethereum disconnected:", error);
      disconnectWallet();
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("disconnect", handleDisconnect);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
      window.ethereum.removeListener("disconnect", handleDisconnect);
    };
  }, [web3State.isConnected, web3State.account]);
  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
  };
};
// Declare ethereum property on window object for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}