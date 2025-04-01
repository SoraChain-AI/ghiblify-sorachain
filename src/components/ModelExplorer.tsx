
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";
import { ModelNode, generateMockNodes } from "@/lib/types";

const ModelExplorer = () => {
  const [nodes, setNodes] = useState<ModelNode[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [globalImprovement, setGlobalImprovement] = useState(0);
  const { toast } = useToast();
  
  // List of countries for random selection
  const countries = [
    "Japan", "USA", "France", "Brazil", "Australia",
    "Canada", "Germany", "India", "UK", "South Korea",
    "Italy", "Spain", "Mexico", "Sweden", "Netherlands",
    "Russia", "China", "South Africa", "Egypt", "Argentina"
  ];

  // Function to get a random country
  const getRandomCountry = () => {
    return countries[Math.floor(Math.random() * countries.length)];
  };
  
  useEffect(() => {
    // Initialize with some mock nodes
    setNodes(generateMockNodes(15));
    
    // Set initial global improvement
    setGlobalImprovement(Math.random() * 5);
    
    // Simulate new contributions coming in
    const interval = setInterval(() => {
      const randomNodeIndex = Math.floor(Math.random() * 15);
      const improvement = Math.random() * 0.3;
      
      // Update the node
      setNodes(prev => {
        const newNodes = [...prev];
        newNodes[randomNodeIndex] = {
          ...newNodes[randomNodeIndex],
          lastContribution: new Date(),
          improvement: improvement
        };
        return newNodes;
      });
      
      // Update global improvement
      setGlobalImprovement(prev => prev + improvement * 0.1);
      
      // Get a random country for the notification
      const randomCountry = getRandomCountry();
      
      // Show a toast for the contribution with the random country
      setActiveNode(nodes[randomNodeIndex]?.id || null);
      
      toast({
        title: `New contribution from ${randomCountry} 🌍`,
        description: `Model improved globally by ${improvement.toFixed(2)}%`,
      });
      
      // Reset active node after animation
      setTimeout(() => {
        setActiveNode(null);
      }, 2000);
      
    }, 8000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  return (
    <div className="ghibli-card w-full max-w-4xl p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Global Model Explorer</h2>
          <p className="text-muted-foreground">
            Watch how contributors around the world improve our model
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 px-4 py-2 bg-ghibli-green bg-opacity-20 rounded-full">
          <span className="text-sm font-medium">
            Global Improvement: {globalImprovement.toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="relative w-full h-[400px] bg-ghibli-cream rounded-lg overflow-hidden border border-ghibli-brown border-opacity-20 p-2">
        {/* World map (simplified) */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <path d="M150,100 Q400,150 600,100 T850,150 L850,350 Q650,300 450,350 T150,300 Z" fill="#000" />
          </svg>
        </div>
        
        {/* Nodes */}
        {nodes.map((node, index) => (
          <NodeDot 
            key={node.id} 
            node={node} 
            index={index} 
            isActive={node.id === activeNode}
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
                    Each node represents a device that trains AI privately on-device. 
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
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Each dot represents an anonymous device contributing to the model.
        Your data never leaves your device.
      </div>
    </div>
  );
};

interface NodeDotProps {
  node: ModelNode;
  index: number;
  isActive: boolean;
}

const NodeDot = ({ node, index, isActive }: NodeDotProps) => {
  // Create somewhat random positions
  const posX = 100 + (index * 50 + Math.sin(index) * 100) % 800;
  const posY = 100 + (index * 30 + Math.cos(index) * 100) % 300;
  
  // Size based on improvement
  const size = 4 + (node.improvement * 10);
  
  // Get time since last contribution
  const timeSince = Math.max(0, new Date().getTime() - new Date(node.lastContribution).getTime());
  const isRecent = timeSince < 60000; // Within the last minute
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`absolute rounded-full transition-all duration-300 ${
              isActive ? 'z-10' : 'z-0'
            }`}
            style={{
              left: `${posX}px`,
              top: `${posY}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isRecent ? '#9b87f5' : '#8FB3DE',
              boxShadow: isActive 
                ? '0 0 0 8px rgba(155, 135, 245, 0.3), 0 0 20px rgba(155, 135, 245, 0.5)' 
                : 'none',
              transform: isActive ? 'scale(1.5)' : 'scale(1)',
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

// Helper function to format time
const formatTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export default ModelExplorer;
