
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
  const [fetchSource, setFetchSource] = useState<string>("loading");
  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Starting to fetch images");
        
        // First try to fetch from the sample_images table
        setFetchSource("database");
        console.log("Fetching from database table");
        
        const { data: dbImages, error: dbError } = await supabase
          .from('sample_images')
          .select('*');
        
        if (dbError) {
          console.error("Error fetching from database:", dbError);
          toast({
            title: "Error fetching from database",
            description: dbError.message,
            variant: "destructive",
          });
        }
        
        if (dbImages && dbImages.length > 0) {
          // Check if we need to fix the URLs in the database records
          const fixedDbImages = dbImages.map(img => {
            // If there's an error with the image URL, let's provide a fixed URL
            return {
              ...img,
              // Use the original URL, but it will fall back if there's an error
            };
          });
          
          console.log(`Found ${dbImages.length} images in the database`);
          setImages(fixedDbImages);
          setLoading(false);
          return;
        } else {
          console.log("No images found in database, trying storage");
        }
        
        // Try to fetch from storage root
        setFetchSource("storage");
        console.log("Fetching from storage bucket root");
        
        const { data: storageFiles, error: storageError } = await supabase
          .storage
          .from('sample_images')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' },
          });
        
        if (storageError) {
          console.error("Error fetching from storage:", storageError);
          toast({
            title: "Error fetching from storage",
            description: storageError.message,
            variant: "destructive",
          });
          setFetchSource("fallback");
          setLoading(false);
          return;
        }
        
        if (storageFiles && storageFiles.length > 0) {
          console.log(`Found ${storageFiles.length} files in storage bucket`);
          
          // Filter for image files only
          const imageFiles = storageFiles.filter(file => 
            !file.id.endsWith('/') && 
            /\.(jpe?g|png|gif|webp)$/i.test(file.name)
          );
          
          if (imageFiles.length === 0) {
            console.log("No image files found in storage bucket");
            setFetchSource("fallback");
            setLoading(false);
            return;
          }
          
          console.log(`Found ${imageFiles.length} image files in storage bucket`);
          
          // Map storage files to our SampleImage format with proper URLs
          const storageImages: SampleImage[] = await Promise.all(imageFiles.map(async (file) => {
            const { data: publicUrl } = supabase.storage
              .from('sample_images')
              .getPublicUrl(file.name);
            
            // Also check if the file exists and is accessible
            console.log(`Storage image: ${file.name} -> ${publicUrl.publicUrl}`);
            
            return {
              id: file.id,
              name: file.name.split('.')[0].replace(/_/g, ' '),
              url: publicUrl.publicUrl,
              category: 'storage'
            };
          }));
          
          setImages(storageImages);
          setFetchSource("storage");
          setLoading(false);
          return;
        } else {
          console.log("No files found in storage bucket");
          setFetchSource("fallback");
        }
      } catch (error) {
        console.error("Error fetching sample images:", error);
        toast({
          title: "Failed to load sample images",
          description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
        setFetchSource("fallback");
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

  // Fallback images from Unsplash (more reliable than previous fallbacks)
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

  // Use fallback images only if no images were found in Supabase
  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Sample Images</h2>
      <p className="text-muted-foreground mb-4 text-center max-w-md mx-auto">
        Select one of these images for Ghibli-style transformation
      </p>
      
      {fetchSource !== "fallback" && (
        <p className="text-center text-sm text-muted-foreground mb-6">
          Source: {fetchSource === "database" ? "Supabase database" : "Supabase storage"}
        </p>
      )}
      
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
                  console.error(`Failed to load image: ${image.url}`);
                  // Use a reliable fallback image from Unsplash
                  e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=500&auto=format";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-sm font-medium truncate">{image.name}</p>
                {image.category && (
                  <p className="text-white/70 text-xs truncate">Source: {image.category}</p>
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
