import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { PAYMENT_CONFIG, formatBalance } from '@/lib/web3';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  itemName: string;
}

export const PaymentModal = ({ isOpen, onClose, onSuccess, itemName }: PaymentModalProps) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: hash, sendTransaction, isPending, error } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePayment = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    const balanceValue = balance ? parseFloat(balance.formatted) : 0;
    const requiredAmount = parseFloat(PAYMENT_CONFIG.processingPrice);

    if (balanceValue < requiredAmount) {
      toast({
        title: "Insufficient balance",
        description: `You need at least ${PAYMENT_CONFIG.processingPrice} ETH to process this image.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      sendTransaction({
        to: PAYMENT_CONFIG.recipientAddress,
        value: parseEther(PAYMENT_CONFIG.processingPrice),
        gas: BigInt(21000), // Standard gas limit for ETH transfer
      });
    } catch (err) {
      console.error('Payment error:', err);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Make sure you have enough Sepolia ETH for gas fees.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Handle successful transaction
  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Payment successful!",
        description: "Your payment has been confirmed. Processing your image...",
      });
      setIsProcessing(false);
      onSuccess();
      onClose();
    }
  }, [isConfirmed, toast, onSuccess, onClose]);

  // Handle transaction error
  useEffect(() => {
    if (error) {
      toast({
        title: "Transaction failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  }, [error, toast]);

  const isLoading = isPending || isConfirming || isProcessing;
  const hasInsufficientBalance = balance ? parseFloat(balance.formatted) < parseFloat(PAYMENT_CONFIG.processingPrice) : true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Processing: <span className="font-medium">{itemName}</span>
            </p>
            <div className="text-2xl font-bold">
              {PAYMENT_CONFIG.processingPrice} ETH
            </div>
            <p className="text-sm text-muted-foreground">
              Transform your image with AI-powered Ghibli styling
            </p>
          </div>

          {balance && (
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Your Balance:</span>
                <span className="font-medium">{formatBalance(balance.formatted)} ETH</span>
              </div>
            </div>
          )}

          {hasInsufficientBalance && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                Insufficient balance. You need {PAYMENT_CONFIG.processingPrice} ETH.
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isLoading || hasInsufficientBalance}
              className="flex-1"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>

          {hash && (
            <div className="text-xs text-center text-muted-foreground">
              Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};