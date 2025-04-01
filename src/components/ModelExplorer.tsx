
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Info, Globe } from "lucide-react";
import { ModelNode, generateMockNodes } from "@/lib/types";

const ModelExplorer = () => {
  const [nodes, setNodes] = useState<ModelNode[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [globalImprovement, setGlobalImprovement] = useState(0);
  const { toast } = useToast();
  const [rotating, setRotating] = useState(true);
  
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

  // Geographical coordinates for each country (approximate central points)
  const countryCoordinates: Record<string, [number, number]> = {
    "Japan": [138, 36],
    "USA": [-100, 40],
    "France": [2, 46],
    "Brazil": [-55, -10],
    "Australia": [133, -25],
    "Canada": [-95, 60],
    "Germany": [10, 51],
    "India": [78, 21],
    "UK": [-2, 54],
    "South Korea": [128, 36],
    "Italy": [12, 42],
    "Spain": [-4, 40],
    "Mexico": [-102, 23],
    "Sweden": [15, 62],
    "Netherlands": [5, 52],
    "Russia": [100, 60],
    "China": [105, 35],
    "South Africa": [25, -30],
    "Egypt": [30, 27],
    "Argentina": [-65, -34]
  };
  
  useEffect(() => {
    // Initialize with some mock nodes
    const initialNodes = generateMockNodes(15);
    
    // Assign actual coordinates based on location names
    const nodesWithCoordinates = initialNodes.map(node => {
      const country = node.location;
      const coordinates = countryCoordinates[country] || [0, 0];
      return {
        ...node,
        longitude: coordinates[0],
        latitude: coordinates[1]
      };
    });
    
    setNodes(nodesWithCoordinates);
    
    // Set initial global improvement
    setGlobalImprovement(Math.random() * 5);
    
    // Simulate new contributions coming in
    const interval = setInterval(() => {
      const randomNodeIndex = Math.floor(Math.random() * 15);
      const improvement = Math.random() * 0.3;
      
      // Get a random country for the notification
      const randomCountry = getRandomCountry();
      const coordinates = countryCoordinates[randomCountry] || [0, 0];
      
      // Update the node
      setNodes(prev => {
        const newNodes = [...prev];
        newNodes[randomNodeIndex] = {
          ...newNodes[randomNodeIndex],
          lastContribution: new Date(),
          improvement: improvement,
          location: randomCountry,
          longitude: coordinates[0],
          latitude: coordinates[1]
        };
        return newNodes;
      });
      
      // Update global improvement
      setGlobalImprovement(prev => prev + improvement * 0.1);
      
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
              <Globe className="w-full h-full text-blue-400" />
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
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Each dot represents an anonymous device contributing to the model.
        Your data never leaves your device.
      </div>
    </div>
  );
};

interface GlobeNodeDotProps {
  node: ModelNode & { longitude?: number; latitude?: number };
  isActive: boolean;
  rotating: boolean;
}

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
  
  // Size based on improvement
  const size = 4 + (node.improvement * 10);
  
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
            className={`absolute rounded-full transition-all duration-300`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isRecent ? '#9b87f5' : '#8FB3DE',
              boxShadow: isActive 
                ? '0 0 0 8px rgba(155, 135, 245, 0.3), 0 0 20px rgba(155, 135, 245, 0.5)' 
                : '0 0 5px rgba(255, 255, 255, 0.7)',
              transform: isActive ? 'scale(1.5)' : 'scale(1)',
              zIndex: isActive ? 20 : zIndex,
              opacity: (Math.cos(lat) * Math.cos(lon) > 0) ? 1 : 0.3,
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
