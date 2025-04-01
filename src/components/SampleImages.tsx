
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  const [images, setImages] = useState<SampleImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // First try to fetch from the sample_images table
        const { data: dbImages, error: dbError } = await supabase
          .from('sample_images')
          .select('*');
        
        if (dbError) {
          throw dbError;
        }
        
        if (dbImages && dbImages.length > 0) {
          setImages(dbImages);
          setLoading(false);
          return;
        }
        
        // If no images in the database, try to fetch from storage root
        const { data: storageRootData, error: storageRootError } = await supabase
          .storage
          .from('sample_images')
          .list('', {
            limit: 20,
            sortBy: { column: 'name', order: 'asc' },
          });
        
        if (storageRootError) {
          console.error("Error fetching from storage root:", storageRootError);
          // Continue to try the ghibli folder if root fails
        } else if (storageRootData && storageRootData.length > 0) {
          // Transform storage objects to our SampleImage format
          const storageImages: SampleImage[] = storageRootData
            .filter(item => !item.id.endsWith('/') && item.name.match(/\.(jpe?g|png|gif|webp)$/i)) // Filter out folders and non-images
            .map(item => {
              const publicUrl = supabase.storage
                .from('sample_images')
                .getPublicUrl(`${item.name}`).data.publicUrl;
              
              return {
                id: item.id,
                name: item.name.split('.')[0].replace(/_/g, ' '),
                url: publicUrl,
                category: 'sample'
              };
            });
          
          if (storageImages.length > 0) {
            setImages(storageImages);
            setLoading(false);
            return;
          }
        }
        
        // If still no images, try the ghibli subfolder
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('sample_images')
          .list('ghibli', {
            limit: 10,
            sortBy: { column: 'name', order: 'asc' },
          });
        
        if (storageError) {
          throw storageError;
        }
        
        if (storageData && storageData.length > 0) {
          // Transform storage objects to our SampleImage format
          const storageImages: SampleImage[] = storageData
            .filter(item => !item.id.endsWith('/') && item.name.match(/\.(jpe?g|png|gif|webp)$/i)) // Filter out folders and non-images
            .map(item => {
              const publicUrl = supabase.storage
                .from('sample_images')
                .getPublicUrl(`ghibli/${item.name}`).data.publicUrl;
              
              return {
                id: item.id,
                name: item.name.split('.')[0].replace(/_/g, ' '),
                url: publicUrl,
                category: 'ghibli'
              };
            });
          
          setImages(storageImages);
        } else {
          // If no images in storage either, log that we'll use fallbacks
          console.log('No images found in Supabase storage, using fallbacks');
        }
      } catch (error) {
        console.error("Error fetching sample images:", error);
        toast({
          title: "Failed to load sample images",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [toast]);

  const handleSelectImage = (image: SampleImage) => {
    setSelectedImageId(image.id);
    onSelectImage(image.url);
    toast({
      title: "Image selected",
      description: `${image.name} has been selected for transformation`,
    });
  };

  // Fallback images if Supabase doesn't have any images yet
  const fallbackImages = [
    {
      id: "fallback-1",
      name: "Mountain Lake",
      description: "Tranquil mountain lake scene",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format",
      category: "nature"
    },
    {
      id: "fallback-2",
      name: "Forest Path",
      description: "Serene path through autumn forest",
      url: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?q=80&w=500&auto=format", 
      category: "nature"
    },
    {
      id: "fallback-3",
      name: "Urban Street",
      description: "Cityscape with vibrant street life",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format",
      category: "urban"
    },
    {
      id: "fallback-4",
      name: "Cottage by the Sea",
      description: "Peaceful cottage overlooking the ocean",
      url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=500&auto=format",
      category: "architecture"
    }
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Sample Images</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md mx-auto">
        Select one of these images for Ghibli-style transformation
      </p>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=500&auto=format";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-sm font-medium truncate">{image.name}</p>
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
