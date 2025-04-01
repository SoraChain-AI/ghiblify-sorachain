
import { useState } from "react";

import { SampleImage } from "./types";

interface ImageItemProps {
  image: SampleImage;
  isSelected: boolean;
  onSelect: (image: SampleImage) => void;
}

const ImageItem = ({ image, isSelected, onSelect }: ImageItemProps) => {
  return (
    <div 
      key={image.id} 
      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all
        ${isSelected ? 'border-ghibli-purple ring-2 ring-ghibli-purple scale-105' : 'border-transparent hover:border-ghibli-blue'}
      `}
      onClick={() => onSelect(image)}
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
        {isSelected && (
          <span className="absolute top-2 right-2 bg-ghibli-purple text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageItem;
