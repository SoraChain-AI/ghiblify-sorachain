import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon } from "lucide-react";
import { SampleImagesProps, SampleImage } from "./sample-images/types";
import ImageGrid from "./sample-images/ImageGrid";
import { sampleImages } from "./sample-images/imageData";
const SampleImages = ({
  onSelectImage
}: SampleImagesProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const {
    toast
  } = useToast();

  // Use the images from our data file
  const displayImages = sampleImages;
  const handleSelectImage = (image: SampleImage) => {
    setSelectedImageId(image.id);
    onSelectImage(image.url);
    toast({
      title: "Image selected",
      description: `${image.name} has been selected for transformation`
    });
  };
  return <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Images</h2>
      <p className="text-muted-foreground mb-4 text-center max-w-md mx-auto">
        Select one of these images for Ghibli-style transformation
      </p>
      
      <ImageGrid images={displayImages} selectedImageId={selectedImageId} loading={loading} onSelectImage={handleSelectImage} />
      
      {selectedImageId && <div className="mt-6 text-center">
          <Button variant="ghibli" className="mx-auto" onClick={() => onSelectImage(displayImages.find(img => img.id === selectedImageId)?.url || "")}>
            <ImageIcon size={16} className="mr-2" />
            Use Selected Image
          </Button>
        </div>}
    </div>;
};
export default SampleImages;