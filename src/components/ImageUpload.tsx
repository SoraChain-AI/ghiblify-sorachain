import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Image as ImageIcon, Lock } from "lucide-react";
import { useAccount } from 'wagmi';
import SampleImages from "./SampleImages";
import { PaymentModal } from "./PaymentModal";

const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected } = useAccount();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragLeave = () => {
    // No-op
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No-op
  };
  const handleUploadClick = () => {
    // No-op
  };
  const handleTransform = () => {
    if (!image && !preview) {
      toast({
        title: "No image selected",
        description: "Please select one of the sample images below.",
        variant: "destructive"
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first to proceed with payment.",
        variant: "destructive"
      });
      return;
    }

    // Show payment modal
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Store the selected image URL in localStorage
    if (preview) {
      localStorage.setItem("originalImageUrl", preview);
    }

    // Close payment modal
    setShowPaymentModal(false);

    // Navigate to the processing page
    navigate("/processing");
  };

  const handleSelectSampleImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = imageUrl.split('/').pop() || 'sample-image.jpg';
      const file = new File([blob], fileName, {
        type: blob.type
      });
      setImage(file);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Error fetching sample image:", error);
      toast({
        title: "Failed to use sample image",
        description: "Please try again or use another image",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="ghibli-card p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Your Image</h2>
        
        <div className={`
            border-2 border-dashed rounded-lg p-8
            border-ghibli-brown border-opacity-30
            bg-white bg-opacity-50
            flex flex-col items-center justify-center
            h-[300px] cursor-not-allowed
            relative
          `}>
          {preview ? (
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={preview} 
                alt="Selected image" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="text-center opacity-70">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-ghibli-blue bg-opacity-50 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-ghibli-dark-blue" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">Upload Image</h3>
              <p className="text-sm text-muted-foreground mb-4">Please select from the uploaded images below</p>
              <Button variant="outline" size="sm" className="rounded-full cursor-not-allowed opacity-50">
                <Upload className="h-4 w-4 mr-2" />
                Upload Disabled
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-4 text-sm">
            <Lock className="h-4 w-4 mr-1.5 text-ghibli-dark-purple" />
            <span className="font-medium bg-gradient-to-r from-ghibli-dark-purple to-ghibli-dark-blue bg-clip-text text-transparent">
              Your image never leaves your device — FL happens locally
            </span>
          </div>
          
          <Button 
            onClick={handleTransform} 
            disabled={!image && !preview} 
            variant="ghibli" 
            className={`${!image && !preview ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Transform to Ghibli Style (0.001 ETH)
          </Button>
        </div>
      </div>

      {/* Sample images section */}
      <SampleImages onSelectImage={handleSelectSampleImage} />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        itemName={image?.name || "Selected Image"}
      />
    </div>
  );
};

export default ImageUpload;
