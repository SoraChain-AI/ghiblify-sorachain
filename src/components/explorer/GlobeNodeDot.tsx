
import { useState } from "react";
import { ModelNode } from "@/lib/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
interface GlobeNodeDotProps {
  node: ModelNode & {
    longitude?: number;
    latitude?: number;
  };
  isActive: boolean;
  rotating: boolean;
}

// Helper function to format time
export const formatTime = (date: Date): string => {
  const diffInSeconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const GlobeNodeDot = ({
  node,
  isActive,
  rotating
}: GlobeNodeDotProps) => {
  // Calculate position on the flat map
  const longitude = node.longitude || 0;
  const latitude = node.latitude || 0;

  // Convert longitude and latitude to positions on the map
  // For a flat map, we use a simple Mercator-like projection
  const containerWidth = 100; // This is a percentage of container width
  const containerHeight = 100; // This is a percentage of container height

  // Map longitude from -180..180 to 0..100% of the container width
  const x = (longitude + 180) / 360 * containerWidth;

  // Map latitude from -90..90 to 0..100% of the container height
  // We also invert it because the y-axis is inverted in CSS (0 is at the top)
  const y = (90 - latitude) / 180 * containerHeight;

  // Size based on improvement (made larger for better visibility)
  const size = 8 + node.improvement * 15;

  // Get time since last contribution
  const timeSince = Math.max(0, new Date().getTime() - new Date(node.lastContribution).getTime());
  const isRecent = timeSince < 60000; // Within the last minute

  // Extra rotation effect for nodes
  const rotationOffset = rotating ? `translateX(${Math.sin(Date.now() / 3000) * 5}px)` : '';
  
  return <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: isRecent ? '#FEF7CD' : '#FFEB3B', // Changed to yellow colors
          borderColor: isActive ? 'white' : 'transparent',
          boxShadow: isActive ? '0 0 0 4px rgba(255, 235, 59, 0.3), 0 0 20px rgba(255, 235, 59, 0.8)' : '0 0 10px rgba(255, 255, 0, 0.9), 0 0 15px rgba(255, 235, 59, 0.5) inset',
          transform: `${isActive ? 'scale(1.5)' : 'scale(1)'} ${rotating ? rotationOffset : ''}`,
          zIndex: isActive ? 20 : 10
        }} className="" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">Node: {node.location}</p>
            <p>Last contribution: {formatTime(node.lastContribution)}</p>
            <p>Improvement: {node.improvement.toFixed(2)}%</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>;
};

export default GlobeNodeDot;
