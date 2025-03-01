import { ethers } from 'ethers';
import { toast } from "sonner";
// Token contract address - This would be your actual deployed token address
export const MEMECOIN_ADDRESS = "0x123456789012345678901234567890123456789"; // Replace with your actual deployed token address
// Token info
export const TOKEN_INFO = {
  name: "MoonieMoon", // Replace with your token name
  symbol: "MOON", // Replace with your token symbol
  decimals: 18,
  totalSupply: "1000000000000000000000000000", // 1 billion tokens with 18 decimals
  logo: "/moonie-logo.png", // Replace with your token logo
  description: "MoonieMoon - The memecoin that's going to the moon... and beyond!",
};
// Simple ERC-20 ABI for token interactions
const TOKEN_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address, address) view returns (uint256)",
  
  // Write functions
  "function transfer(address, uint256) returns (bool)",
  "function approve(address, uint256) returns (bool)",
  "function transferFrom(address, address, uint256) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];
// Interface for token balance
export interface TokenBalance {
  token: string;
  balance: string;
  formattedBalance: string;
}
// Create a contract instance
export const getTokenContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.BrowserProvider) => {
  return new ethers.Contract(MEMECOIN_ADDRESS, TOKEN_ABI, signerOrProvider);
};
// Get user's token balance
export const getTokenBalance = async (
  account: string | null,
  provider: ethers.BrowserProvider | null
): Promise<TokenBalance | null> => {
  if (!account || !provider) return null;
  try {
    const contract = getTokenContract(provider);
    const balance = await contract.balanceOf(account);
    const formattedBalance = ethers.formatUnits(balance, TOKEN_INFO.decimals);
    return {
      token: TOKEN_INFO.symbol,
      balance: balance.toString(),
      formattedBalance,
    };
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return null;
  }
};
// Get ETH balance
export const getEthBalance = async (
  account: string | null,
  provider: ethers.BrowserProvider | null
): Promise<string | null> => {
  if (!account || !provider) return null;
  try {
    const balance = await provider.getBalance(account);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching ETH balance:", error);
    return null;
  }
};
// Approve token spending
export const approveTokens = async (
  signer: ethers.JsonRpcSigner | null,
  spender: string,
  amount: string
): Promise<boolean> => {
  if (!signer) {
    toast.error("Please connect your wallet first");
    return false;
  }
  try {
    const contract = getTokenContract(signer);
    const parsedAmount = ethers.parseUnits(amount, TOKEN_INFO.decimals);
    
    const tx = await contract.approve(spender, parsedAmount);
    toast.info("Approval transaction sent. Waiting for confirmation...");
    
    await tx.wait();
    toast.success("Token approval successful!");
    return true;
  } catch (error) {
    console.error("Error approving tokens:", error);
    toast.error("Failed to approve tokens");
    return false;
  }
};
// Swap ETH for tokens function (simplified)
export const swapEthForTokens = async (
  signer: ethers.JsonRpcSigner | null,
  ethAmount: string
): Promise<boolean> => {
  if (!signer) {
    toast.error("Please connect your wallet first");
    return false;
  }
  try {
    // In a real implementation, this would call a swap contract
    // For now, we'll simulate a successful swap
    toast.info(`Simulating swap of ${ethAmount} ETH for ${TOKEN_INFO.symbol}...`);
    
    // Simulate delay for transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate token amount (simplified - would normally use price from a price feed)
    const tokenAmount = parseFloat(ethAmount) * 1000; // 1 ETH = 1000 tokens (example rate)
    
    toast.success(`Successfully swapped ${ethAmount} ETH for ${tokenAmount} ${TOKEN_INFO.symbol}!`);
    return true;
  } catch (error) {
    console.error("Error swapping ETH for tokens:", error);
    toast.error("Failed to swap ETH for tokens");
    return false;
  }
};
// Token price mock data (for demonstration)
export const getTokenPriceHistory = () => {
  // Simulated price data for the last 7 days
  const now = new Date();
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a price with some random variation around a trend
    const basePrice = 0.0025; // Base price in ETH
    const trend = i / 30; // Trending upward
    const random = Math.random() * 0.0005 - 0.00025; // Random fluctuation
    
    const price = basePrice + basePrice * trend + random;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: price,
    });
  }
  
  return data;
};
// Current token price (mock)
export const getCurrentTokenPrice = (): number => {
  // Last price from the price history
  const priceHistory = getTokenPriceHistory();
  return priceHistory[priceHistory.length - 1].price;
};