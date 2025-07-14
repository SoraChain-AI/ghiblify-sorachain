import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Ghiblify',
  projectId: 'ghiblify-web3-project', // Replace with your WalletConnect project ID
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
  recipientAddress: '0x742d35Cc6235A4E8dA9e6B1c7c8c5F5d8f1A1234' as `0x${string}`,
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