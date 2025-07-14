
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet, Check, AlertCircle } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { formatBalance } from '@/lib/web3';
import { useEffect } from 'react';

const WalletConnect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  useEffect(() => {
    if (isConnected && address) {
      toast({
        title: "Wallet connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    }
  }, [isConnected, address, toast]);

  const handleContinue = () => {
    if (isConnected) {
      navigate("/upload");
    } else {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

            return (
              <div className="space-y-3">
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        onClick={openConnectModal}
                        className="ghibli-button-secondary w-full flex items-center justify-center gap-2"
                      >
                        <Wallet className="h-5 w-5" />
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button
                        onClick={openChainModal}
                        className="w-full flex items-center justify-center gap-2"
                        variant="destructive"
                      >
                        <AlertCircle className="h-5 w-5" />
                        Wrong Network
                      </Button>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={openAccountModal}
                          className="flex-1 flex items-center justify-center gap-2"
                          variant="outline"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                          {account.displayName}
                        </Button>
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          className="px-3"
                        >
                          {chain.name}
                        </Button>
                      </div>
                      
                      {balance && (
                        <div className="text-center text-sm text-muted-foreground">
                          Balance: {formatBalance(balance.formatted)} ETH
                        </div>
                      )}
                      
                      <Button
                        onClick={handleContinue}
                        className="ghibli-button-primary w-full"
                      >
                        Continue to Upload
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Connect your MetaMask or WalletConnect compatible wallet to Sepolia testnet
      </p>
    </div>
  );
};

export default WalletConnect;
