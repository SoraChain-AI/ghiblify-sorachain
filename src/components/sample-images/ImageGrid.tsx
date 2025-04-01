
import { Skeleton } from "@/components/ui/skeleton";
import { SampleImage } from "./types";
import ImageItem from "./ImageItem";

interface ImageGridProps {
  images: SampleImage[];
  selectedImageId: string | null;
  loading: boolean;
  onSelectImage: (image: SampleImage) => void;
}

const ImageGrid = ({ images, selectedImageId, loading, onSelectImage }: ImageGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          isSelected={selectedImageId === image.id}
          onSelect={onSelectImage}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
