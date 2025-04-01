
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWalletConnect = async () => {
    // Simulate wallet connection
    toast({
      title: "Wallet connected",
      description: "Your crypto wallet has been successfully connected.",
    });
    navigate("/upload");
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleWalletConnect}
        className="ghibli-button-secondary w-full flex items-center justify-center gap-2"
      >
        <Wallet className="h-5 w-5" />
        Connect Wallet
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        Connect your MetaMask or WalletConnect compatible wallet
      </p>
    </div>
  );
};

export default WalletConnect;
