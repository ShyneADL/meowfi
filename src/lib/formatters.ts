
export function formatCurrency(value: string | number, decimals: number = 6): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(num)) return "0.00";
  
  // Handle very small numbers
  if (Math.abs(num) < 0.000001) {
    return "< 0.000001";
  }
  
  // Format with specified decimals
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

export function shortenAddress(address: string | null, chars: number = 4): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function calculatePercentage(value: number, percentage: number): number {
  return value * (percentage / 100);
}
