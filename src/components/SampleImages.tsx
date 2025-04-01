
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon } from "lucide-react";

interface SampleImage {
  id: string;
  name: string;
  description?: string;
  url: string;
  category?: string;
}

interface SampleImagesProps {
  onSelectImage: (imageUrl: string) => void;
}

const SampleImages = ({ onSelectImage }: SampleImagesProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use the provided image links directly
  const images: SampleImage[] = [
    {
      id: "image-1",
      name: "Scenic Image 1",
      description: "Beautiful scenery",
      url: "https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//IMG_4142.jpeg",
      category: "landscape"
    },
    {
      id: "image-2",
      name: "Scenic Image 2",
      description: "Stunning view",
      url: "https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//IMG_4149.jpeg",
      category: "landscape"
    },
    {
      id: "image-3",
      name: "Scenic Image 3",
      description: "Amazing landscape",
      url: "https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//IMG_4164.jpeg",
      category: "landscape"
    }
  ];

  // Fallback images from Unsplash (in case the provided images fail to load)
  const fallbackImages = [
    {
      id: "fallback-1",
      name: "Mountain Lake",
      description: "Tranquil mountain lake scene",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format",
      category: "fallback"
    },
    {
      id: "fallback-2",
      name: "Forest Path",
      description: "Serene path through autumn forest",
      url: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?q=80&w=500&auto=format", 
      category: "fallback"
    },
    {
      id: "fallback-3",
      name: "Urban Street",
      description: "Cityscape with vibrant street life",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format",
      category: "fallback"
    },
    {
      id: "fallback-4",
      name: "Cottage by the Sea",
      description: "Peaceful cottage overlooking the ocean",
      url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=500&auto=format",
      category: "fallback"
    }
  ];

  const handleSelectImage = (image: SampleImage) => {
    setSelectedImageId(image.id);
    onSelectImage(image.url);
    toast({
      title: "Image selected",
      description: `${image.name} has been selected for transformation`,
    });
  };

  // Use the provided images, no need to check for empty state
  const displayImages = images;

  return (
    <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Sample Images</h2>
      <p className="text-muted-foreground mb-4 text-center max-w-md mx-auto">
        Select one of these images for Ghibli-style transformation
      </p>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.map((image) => (
            <div 
              key={image.id} 
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                ${selectedImageId === image.id ? 'border-ghibli-purple ring-2 ring-ghibli-purple scale-105' : 'border-transparent hover:border-ghibli-blue'}
              `}
              onClick={() => handleSelectImage(image)}
            >
              <img 
                src={image.url} 
                alt={image.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: ${image.url}`);
                  // Use a reliable fallback image from Unsplash
                  e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=500&auto=format";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-sm font-medium truncate">{image.name}</p>
                {image.category && (
                  <p className="text-white/70 text-xs truncate">Category: {image.category}</p>
                )}
                {selectedImageId === image.id && (
                  <span className="absolute top-2 right-2 bg-ghibli-purple text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedImageId && (
        <div className="mt-6 text-center">
          <Button 
            variant="ghibli" 
            className="mx-auto"
            onClick={() => onSelectImage(displayImages.find(img => img.id === selectedImageId)?.url || "")}
          >
            <ImageIcon size={16} className="mr-2" />
            Use Selected Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default SampleImages;
