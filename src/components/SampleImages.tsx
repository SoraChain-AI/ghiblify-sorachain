
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { SampleImagesProps } from "./sample-images/types";
import ImageGrid from "./sample-images/ImageGrid";
import { sampleImages } from "./sample-images/imageData";

const SampleImages = ({
  onSelectImage
}: SampleImagesProps) => {
  // Remove selectedImageId and related state
  const displayImages = sampleImages;

  return (
    <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Sample Images</h2>
      <p className="text-muted-foreground mb-4 text-center max-w-md mx-auto">
        Showcase of images
      </p>
      
      {/* Remove onSelectImage prop from ImageGrid */}
      <ImageGrid 
        images={displayImages} 
        selectedImageId={null} 
        loading={false} 
        onSelectImage={() => {}} 
      />
    </div>
  );
};

export default SampleImages;
