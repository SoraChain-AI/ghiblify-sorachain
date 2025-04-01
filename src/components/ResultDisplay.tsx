import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download, Share2, Award } from "lucide-react";

// Placeholder for the transformed image
const TRANSFORMED_IMAGE = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05";
interface ResultDisplayProps {
  originalImage?: string;
  transformedImage?: string;
}
const ResultDisplay = ({
  originalImage,
  transformedImage = TRANSFORMED_IMAGE
}: ResultDisplayProps) => {
  const [claimingReward, setClaimingReward] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleDownload = () => {
    // In a real app, this would download the image
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = 'ghiblified-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Image downloaded",
      description: "Your Ghiblified image has been saved to your device."
    });
  };
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here."
    });
  };
  const handleClaimRewards = () => {
    setClaimingReward(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setClaimingReward(false);
      toast({
        title: "Rewards claimed!",
        description: "20 SoraTokens have been added to your wallet."
      });

      // Navigate to dashboard after claiming
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 2000);
  };
  return <div className="ghibli-card w-full max-w-2xl p-6 md:p-8 animate-scale-up">
      <div className="text-center mb-6">
        <div className="inline-block p-2 bg-ghibli-green bg-opacity-30 rounded-full mb-3">
          <Award className="h-6 w-6 text-ghibli-dark-green" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Ghibli Transformation is Complete!</h2>
        
      </div>
      
      <div className="bg-black bg-opacity-5 rounded-lg overflow-hidden mb-6">
        <img src={transformedImage} alt="Ghiblified Image" className="w-full h-auto object-cover" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button variant="outline" onClick={handleDownload} className="rounded-full flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          Download Image
        </Button>
        
        <Button variant="outline" onClick={handleShare} className="rounded-full flex items-center justify-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Creation
        </Button>
      </div>
      
      <div className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-opacity-10 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="font-semibold">Want to claim your contribution rewards?</h3>
          <p className="text-sm text-muted-foreground">Earn $SORA as proof of your contribution</p>
        </div>
        
        <Button onClick={handleClaimRewards} disabled={claimingReward} className="ghibli-button min-w-[140px]">
          {claimingReward ? "Claiming..." : "Claim Rewards"}
        </Button>
      </div>
    </div>;
};
export default ResultDisplay;