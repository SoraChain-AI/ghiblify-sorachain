
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ModelNode, generateMockNodes } from "@/lib/types";
import Globe from "@/components/explorer/Globe";
import { getRandomCountry, countryCoordinates } from "@/utils/countryData";

const ModelExplorer = () => {
  const [nodes, setNodes] = useState<ModelNode[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [globalImprovement, setGlobalImprovement] = useState(0);
  const { toast } = useToast();
  const [rotating, setRotating] = useState(true);
  
  useEffect(() => {
    // Initialize with more mock nodes for better distribution
    const initialNodes = generateMockNodes(25);
    
    // Assign actual coordinates based on location names
    // Add some random offset to prevent overlapping
    const nodesWithCoordinates = initialNodes.map(node => {
      const country = node.location;
      const coordinates = countryCoordinates[country] || [0, 0];
      
      // Add small random offsets to longitude and latitude for better distribution
      const longitudeOffset = (Math.random() - 0.5) * 10; // +/- 5 degrees
      const latitudeOffset = (Math.random() - 0.5) * 10;  // +/- 5 degrees
      
      return {
        ...node,
        longitude: coordinates[0] + longitudeOffset,
        latitude: coordinates[1] + latitudeOffset
      };
    });
    
    setNodes(nodesWithCoordinates);
    
    // Set initial global improvement
    setGlobalImprovement(Math.random() * 5);
    
    // Simulate new contributions coming in
    const interval = setInterval(() => {
      const randomNodeIndex = Math.floor(Math.random() * 25);
      const improvement = Math.random() * 0.3;
      
      // Get a random country for the notification
      const randomCountry = getRandomCountry();
      const coordinates = countryCoordinates[randomCountry] || [0, 0];
      
      // Add random offset for the new node as well
      const longitudeOffset = (Math.random() - 0.5) * 10;
      const latitudeOffset = (Math.random() - 0.5) * 10;
      
      // Update the node
      setNodes(prev => {
        const newNodes = [...prev];
        newNodes[randomNodeIndex] = {
          ...newNodes[randomNodeIndex],
          lastContribution: new Date(),
          improvement: improvement,
          location: randomCountry,
          longitude: coordinates[0] + longitudeOffset,
          latitude: coordinates[1] + latitudeOffset
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
      
      <Globe 
        nodes={nodes} 
        activeNode={activeNode} 
        rotating={rotating} 
        setRotating={setRotating} 
      />
    </div>
  );
};

export default ModelExplorer;
