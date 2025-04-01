
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Image as ImageIcon, Lock } from "lucide-react";
import SampleImages from "./SampleImages";

const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTransform = () => {
    if (!image && !preview) {
      toast({
        title: "No image selected",
        description: "Please upload or select an image first.",
        variant: "destructive",
      });
      return;
    }

    // Store the selected image URL in localStorage
    if (preview) {
      localStorage.setItem("originalImageUrl", preview);
    }

    // Navigate to the processing page
    navigate("/processing");
  };

  const handleSelectSampleImage = async (imageUrl: string) => {
    // Fetch the image as a blob
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = imageUrl.split('/').pop() || 'sample-image.jpg';
      const file = new File([blob], fileName, { type: blob.type });
      
      setImage(file);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Error fetching sample image:", error);
      toast({
        title: "Failed to use sample image",
        description: "Please try again or upload your own image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="ghibli-card p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Your Image</h2>
        
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 transition-all duration-200
            ${isDragging ? 'border-ghibli-purple bg-ghibli-purple bg-opacity-5' : 'border-ghibli-brown border-opacity-30'}
            ${preview ? 'bg-black bg-opacity-5' : 'bg-white bg-opacity-50'}
            flex flex-col items-center justify-center cursor-pointer
            h-[300px]
          `}
          onClick={handleUploadClick}
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          
          {preview ? (
            <div className="relative w-full h-full">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-ghibli-blue bg-opacity-50 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-ghibli-dark-blue" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">Drag and drop your image here</h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse your files
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                <Upload className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-4 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 mr-1.5" />
            <span>Your image never leaves your device — FL happens locally</span>
          </div>
          
          <Button 
            onClick={handleTransform}
            disabled={!image && !preview}
            variant="ghibli"
            className={`${(!image && !preview) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Transform to Ghibli Style
          </Button>
        </div>
      </div>

      {/* Sample images section */}
      <SampleImages onSelectImage={handleSelectSampleImage} />
    </div>
  );
};

export default ImageUpload;
