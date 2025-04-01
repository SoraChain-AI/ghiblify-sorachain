
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
    // Start with an empty array and add nodes one by one with delays
    setNodes([]);
    
    // Set initial global improvement
    setGlobalImprovement(Math.random() * 5);
    
    // Add initial nodes gradually with timeouts to avoid clustering at start
    const countries = Object.keys(countryCoordinates);
    
    // Create a function to add a node at a random position
    const addRandomNode = (index: number) => {
      if (index >= 30) return; // Stop after adding 30 nodes
      
      // Pick a random country
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const coordinates = countryCoordinates[randomCountry] || [0, 0];
      
      // Add reasonable offset for better distribution
      const longitudeOffset = (Math.random() - 0.5) * 8;
      const latitudeOffset = (Math.random() - 0.5) * 8;
      
      // Create a new node
      const newNode: ModelNode = {
        id: Math.random().toString(36).substring(2, 9),
        location: randomCountry,
        longitude: coordinates[0] + longitudeOffset,
        latitude: coordinates[1] + latitudeOffset,
        lastContribution: new Date(Date.now() - Math.random() * 86400000),
        improvement: Math.random() * 0.5
      };
      
      // Add the node to the state
      setNodes(prev => [...prev, newNode]);
      
      // Schedule next node addition
      setTimeout(() => addRandomNode(index + 1), 100);
    };
    
    // Start adding nodes after a short delay
    setTimeout(() => addRandomNode(0), 500);
    
    // Simulate new contributions coming in
    const interval = setInterval(() => {
      const improvement = Math.random() * 0.3;
      
      // Get a random country for the notification
      const randomCountry = getRandomCountry();
      const coordinates = countryCoordinates[randomCountry] || [0, 0];
      
      // Add random offset for the new node as well
      const longitudeOffset = (Math.random() - 0.5) * 8;
      const latitudeOffset = (Math.random() - 0.5) * 8;
      
      // Update a random node or add a new one if there are fewer than 30
      setNodes(prev => {
        // If we have at least one node, update a random one
        if (prev.length > 0) {
          const randomNodeIndex = Math.floor(Math.random() * prev.length);
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
        }
        // Fallback if there are no nodes yet (shouldn't happen with our new approach)
        return prev;
      });
      
      // Update global improvement
      setGlobalImprovement(prev => prev + improvement * 0.1);
      
      // Show a toast for the contribution with the random country
      setActiveNode(nodes[0]?.id || null);
      
      toast({
        title: `New contribution from ${randomCountry} 🌍`,
        description: `Model improved globally by ${improvement.toFixed(2)}%`,
      });
      
      // Reset active node after animation
      setTimeout(() => {
        setActiveNode(null);
      }, 2000);
      
    }, 4000); // Keep the 4000ms frequency for updates
    
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
