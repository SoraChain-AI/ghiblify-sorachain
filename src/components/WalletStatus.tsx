import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatBalance, formatAddress } from '@/lib/web3';
import { Wallet, AlertCircle } from 'lucide-react';

export const WalletStatus = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            onClick={openConnectModal}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-ghibli-brown/20 hover:bg-ghibli-cream/50 transition-colors"
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </button>
        )}
      </ConnectButton.Custom>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
      }) => (
        <div className="flex items-center gap-2">
          {chain?.unsupported ? (
            <button
              onClick={openChainModal}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-red-100 text-red-700 border border-red-200"
            >
              <AlertCircle className="h-4 w-4" />
              Wrong Network
            </button>
          ) : (
            <button
              onClick={openAccountModal}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-ghibli-brown/20 hover:bg-ghibli-cream/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>{account?.displayName}</span>
              {balance && (
                <span className="text-muted-foreground">
                  {formatBalance(balance.formatted)} ETH
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </ConnectButton.Custom>
  );
};