
export interface SampleImage {
  id: string;
  name: string;
  description?: string;
  url: string;
  category?: string;
}

export interface SampleImagesProps {
  onSelectImage: (imageUrl: string) => void;
}
