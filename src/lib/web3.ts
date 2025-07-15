import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Ghiblify',
  projectId: '2f05a7cac391c26cf0af2c5062d275ad', // Valid WalletConnect project ID
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/DuwwDL0xnS4LpRDu67IMKlkjkixYcsE5'),
  },
});

// Payment configuration
export const PAYMENT_CONFIG = {
  // Price in ETH for image processing
  processingPrice: '0.001', // 0.001 ETH (~$2-3 depending on ETH price)
  // Recipient address (you should replace this with your actual address)
  recipientAddress: '0x742d35Cc6Af62f44150A6b2199E4A96F138CE508' as `0x${string}`,
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: string): string => {
  const num = parseFloat(balance);
  if (num < 0.0001) return '< 0.0001';
  return num.toFixed(4);
};