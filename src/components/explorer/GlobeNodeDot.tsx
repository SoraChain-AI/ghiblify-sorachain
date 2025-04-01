
import { useState } from "react";
import { ModelNode } from "@/lib/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface GlobeNodeDotProps {
  node: ModelNode & { longitude?: number; latitude?: number };
  isActive: boolean;
  rotating: boolean;
}

// Helper function to format time
export const formatTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const GlobeNodeDot = ({ node, isActive, rotating }: GlobeNodeDotProps) => {
  // Calculate position on the globe surface
  const longitude = node.longitude || 0;
  const latitude = node.latitude || 0;
  
  // Convert spherical coordinates to Cartesian coordinates
  // Note: These are simplified calculations for a 2D representation
  const radius = 150; // Half of the globe's width/height
  const centerX = 150; // Center X within the parent container
  const centerY = 150; // Center Y within the parent container
  
  // Convert latitude and longitude to radians
  const lat = latitude * Math.PI / 180;
  const lon = longitude * Math.PI / 180;
  
  // Calculate position (simplified for 2D front-facing visibility)
  const x = centerX + radius * Math.cos(lat) * Math.sin(lon) * 0.5;
  const y = centerY - radius * Math.sin(lat) * 0.5;
  
  // Adjust z-index for dots appearing "behind" the globe
  const zIndex = Math.cos(lat) * Math.cos(lon) > 0 ? 10 : 0;
  
  // Size based on improvement (made larger for better visibility)
  const size = 8 + (node.improvement * 15);
  
  // Get time since last contribution
  const timeSince = Math.max(0, new Date().getTime() - new Date(node.lastContribution).getTime());
  const isRecent = timeSince < 60000; // Within the last minute
  
  // Extra rotation effect for nodes
  const rotationOffset = rotating ? 
    `translateX(${Math.sin(Date.now() / 3000) * 10}px)` : '';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`absolute rounded-full transition-all duration-300 animate-pulse-gentle border`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isRecent ? '#9b87f5' : '#8FB3DE',
              borderColor: isActive ? 'white' : 'transparent',
              boxShadow: isActive 
                ? '0 0 0 4px rgba(155, 135, 245, 0.3), 0 0 20px rgba(155, 135, 245, 0.8)' 
                : '0 0 10px rgba(155, 255, 255, 0.9), 0 0 15px rgba(155, 135, 245, 0.5) inset',
              transform: isActive ? 'scale(1.5)' : 'scale(1)',
              zIndex: isActive ? 20 : zIndex,
              opacity: (Math.cos(lat) * Math.cos(lon) > 0) ? 1 : 0.5,
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">Node: {node.location}</p>
            <p>Last contribution: {formatTime(node.lastContribution)}</p>
            <p>Improvement: {node.improvement.toFixed(2)}%</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GlobeNodeDot;
