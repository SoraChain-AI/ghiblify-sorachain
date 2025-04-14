
import { useState } from "react";
import { Info } from "lucide-react";
import { ModelNode } from "@/lib/types";
import GlobeNodeDot from "./GlobeNodeDot";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface GlobeProps {
  nodes: ModelNode[];
  activeNode: string | null;
  rotating: boolean;
  setRotating: (rotating: boolean) => void;
}

const Globe = ({
  nodes,
  activeNode,
  rotating,
  setRotating
}: GlobeProps) => {
  // Use state to track if the main image failed to load
  const [imageError, setImageError] = useState(false);

  return <div className="space-y-3">
      <div className="relative w-full h-[400px] bg-ghibli-cream rounded-lg overflow-hidden border border-ghibli-brown border-opacity-20 p-2">
        {/* World Map representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden" onClick={() => setRotating(!rotating)}>
            {/* World Map Image */}
            {!imageError ? <img 
              alt="World Map" 
              className="w-full h-full object-cover" 
              onError={() => setImageError(true)} 
              src="https://oucabhirqtlnsamrkmdu.supabase.co/storage/v1/object/public/sample_images//global-globalization-world-map-environmental-concservation-concept_53876-124164.avif" 
            /> : <div className="w-full h-full flex items-center justify-center bg-blue-100">
                <p className="text-blue-600">World Map Image Failed to Load</p>
              </div>}

            <div className="absolute top-0 right-0 m-2 text-xs text-white bg-ghibli-dark-green px-2 py-1 rounded-full shadow-md">
              Click to {rotating ? 'pause' : 'animate'} dots
            </div>
          </div>
        </div>
        
        {/* Nodes on the world map */}
        {nodes.map(node => <GlobeNodeDot key={node.id} node={node} isActive={node.id === activeNode} rotating={rotating} />)}
        
        {/* Educational tooltips */}
        <div className="absolute bottom-4 right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200">
                  <Info className="h-4 w-4 text-ghibli-dark-green" />
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
      </div>
      
      {/* Moved from inside the globe to below it */}
      <div className="text-sm text-muted-foreground text-center">
        Each green dot represents an anonymous device contributing to the model. 
        Your data never leaves your device.
      </div>
    </div>;
};

export default Globe;
