
import { SampleImage } from "./types";

// Sample images with direct URLs
export const sampleImages: SampleImage[] = [
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

// Mapping of original images to their transformed versions
export const transformedImageMap: Record<string, string> = {
  "https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//IMG_4142.jpeg": 
  "https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//5181826D-103E-41D9-85C4-151FA0A4C9B3.PNG"
};

// Fallback images from Unsplash (in case the provided images fail to load)
export const fallbackImages: SampleImage[] = [
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
