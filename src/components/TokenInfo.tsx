import { TOKEN_INFO, getCurrentTokenPrice } from "../utils/tokenContract";
import { ArrowUpRight, Globe, ExternalLink } from "lucide-react";
const TokenInfo = () => {
  const tokenPrice = getCurrentTokenPrice();
  
  // Mock stats for the token
  const stats = [
    { name: "Market Cap", value: `$${(parseFloat(TOKEN_INFO.totalSupply) * tokenPrice * 3000 / 1e18).toLocaleString()}` },
    { name: "Total Supply", value: `${(parseFloat(TOKEN_INFO.totalSupply) / 1e18).toLocaleString()} ${TOKEN_INFO.symbol}` },
    { name: "Holders", value: "1,234" },
    { name: "Transactions", value: "12,345" },
  ];
  
  const features = [
    {
      title: "Community Driven",
      description: "Governed by its community through voting mechanisms.",
      icon: <Globe className="h-5 w-5 text-primary" />
    },
    {
      title: "Zero Tax",
      description: "No transaction fees or taxes on buys or sells.",
      icon: <ArrowUpRight className="h-5 w-5 text-primary" />
    },
  ];
  return (
    <section className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About {TOKEN_INFO.symbol}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {TOKEN_INFO.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Token Stats Card */}
          <div className="rounded-2xl glass p-6 border border-white/20 shadow-glass">
            <h3 className="text-lg font-semibold mb-4">Token Stats</h3>
            <dl className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.name} className="flex justify-between">
                  <dt className="text-muted-foreground">{stat.name}</dt>
                  <dd className="font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* Features Card */}
          <div className="rounded-2xl glass p-6 border border-white/20 shadow-glass">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.title} className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Token Price Card */}
          <div className="rounded-2xl glass p-6 border border-white/20 shadow-glass">
            <h3 className="text-lg font-semibold mb-4">Current Price</h3>
            <div className="text-3xl font-bold mb-2">
              {tokenPrice.toFixed(6)} ETH
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              ≈ ${(tokenPrice * 3000).toFixed(2)} USD
            </p>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Contract Address</h4>
              <a 
                href={`https://sepolia.etherscan.io/address/0x123456789012345678901234567890123456789`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono bg-secondary px-3 py-2 rounded-lg flex items-center hover:bg-secondary/80 transition-colors"
              >
                <span className="truncate">0x123456789012345678901234567890123456789</span>
                <ExternalLink size={14} className="ml-2 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TokenInfo;