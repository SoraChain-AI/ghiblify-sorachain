
import { useState } from "react";
import { Globe as GlobeIcon } from "lucide-react";
import { ModelNode } from "@/lib/types";
import GlobeNodeDot from "./GlobeNodeDot";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface GlobeProps {
  nodes: ModelNode[];
  activeNode: string | null;
  rotating: boolean;
  setRotating: (rotating: boolean) => void;
}

const Globe = ({ nodes, activeNode, rotating, setRotating }: GlobeProps) => {
  return (
    <div className="relative w-full h-[400px] bg-ghibli-cream rounded-lg overflow-hidden border border-ghibli-brown border-opacity-20 p-2">
      {/* 3D Globe representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`relative w-[300px] h-[300px] rounded-full bg-blue-100 border-2 border-blue-300 shadow-lg ${rotating ? 'animate-spin-slow' : ''}`}
          style={{
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17_with_transparent_background.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          onClick={() => setRotating(!rotating)}
        >
          <div className="absolute top-0 right-0 m-2 text-xs text-ghibli-blue bg-white px-2 py-1 rounded-full opacity-70">
            Click to {rotating ? 'pause' : 'rotate'}
          </div>
          
          {/* Globe icon as a fallback */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0">
            <GlobeIcon className="w-full h-full text-blue-400" />
          </div>
        </div>
      </div>
      
      {/* Nodes on the globe */}
      {nodes.map((node) => (
        <GlobeNodeDot 
          key={node.id} 
          node={node} 
          isActive={node.id === activeNode}
          rotating={rotating}
        />
      ))}
      
      {/* Educational tooltips */}
      <div className="absolute bottom-4 right-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md">
                <Info className="h-4 w-4 text-primary" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">How Federated Learning Works</p>
                <p className="text-sm">
                  Each dot represents a device that trains AI privately on-device. 
                  Only anonymous model improvements are shared, never your actual data.
                </p>
                <p className="text-sm">
                  Blockchain ensures transparency and fair rewards for all contributors.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center absolute bottom-2 left-0 right-0">
        Each dot represents an anonymous device contributing to the model.
        Your data never leaves your device.
      </div>
    </div>
  );
};

export default Globe;
