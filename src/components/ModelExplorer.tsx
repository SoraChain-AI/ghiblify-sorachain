
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ModelNode, generateMockNodes } from "@/lib/types";
import Globe from "@/components/explorer/Globe";
import { getRandomCountry, countryCoordinates } from "@/utils/countryData";

// Helper function to create random ocean-based coordinates
const getOceanCoordinates = () => {
  // Randomly select an ocean region with higher probability for water areas
  const oceanRegion = Math.random() * 100;
  
  if (oceanRegion < 35) {
    // Pacific Ocean region (larger probability due to size)
    return [
      -180 + Math.random() * 80,
      -40 + Math.random() * 80
    ];
  } else if (oceanRegion < 60) {
    // Atlantic Ocean region
    return [
      -70 + Math.random() * 60,
      -40 + Math.random() * 80
    ];
  } else if (oceanRegion < 80) {
    // Indian Ocean region
    return [
      50 + Math.random() * 50,
      -40 + Math.random() * 80
    ];
  } else {
    // Southern Ocean / Antarctic region
    return [
      Math.random() * 360 - 180,
      -60 - Math.random() * 30
    ];
  }
};

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
    
    // Create a map to track unique locations
    const uniqueLocationMap = new Map<string, ModelNode>();
    
    // Add initial nodes gradually with timeouts to avoid clustering at start
    const countries = Object.keys(countryCoordinates);
    
    // Create a function to add a node at a random position
    const addRandomNode = (index: number) => {
      if (index >= 30) return; // Stop after adding 30 nodes
      
      // Pick a random country
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      
      // Skip if we already have a node for this country
      if (uniqueLocationMap.has(randomCountry)) {
        // Try again with a different country
        addRandomNode(index);
        return;
      }
      
      // Get ocean-based coordinates instead of country coordinates
      const coordinates = getOceanCoordinates();
      
      // Create a new node
      const newNode: ModelNode = {
        id: Math.random().toString(36).substring(2, 9),
        location: randomCountry,
        longitude: coordinates[0],
        latitude: coordinates[1],
        lastContribution: new Date(Date.now() - Math.random() * 86400000),
        improvement: Math.random() * 0.5
      };
      
      // Add the node to our map and state
      uniqueLocationMap.set(randomCountry, newNode);
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
      let randomCountry = getRandomCountry();
      
      // Update existing node if we have one for this location, otherwise add new one
      setNodes(prev => {
        const newNodes = [...prev];
        const existingNodeIndex = newNodes.findIndex(node => node.location === randomCountry);
        
        if (existingNodeIndex >= 0) {
          // Update existing node
          newNodes[existingNodeIndex] = {
            ...newNodes[existingNodeIndex],
            lastContribution: new Date(),
            improvement: improvement
          };
          
          // Set the updated node as active
          setActiveNode(newNodes[existingNodeIndex].id);
        } else {
          // If we have fewer than 30 nodes, add a new one for this location
          if (newNodes.length < 30) {
            const coordinates = getOceanCoordinates();
            
            const newNode: ModelNode = {
              id: Math.random().toString(36).substring(2, 9),
              location: randomCountry,
              longitude: coordinates[0],
              latitude: coordinates[1],
              lastContribution: new Date(),
              improvement: improvement
            };
            
            newNodes.push(newNode);
            setActiveNode(newNode.id);
          } else {
            // If we already have 30 nodes, update a random one
            const randomNodeIndex = Math.floor(Math.random() * newNodes.length);
            randomCountry = newNodes[randomNodeIndex].location;
            newNodes[randomNodeIndex] = {
              ...newNodes[randomNodeIndex],
              lastContribution: new Date(),
              improvement: improvement
            };
            setActiveNode(newNodes[randomNodeIndex].id);
          }
        }
        
        return newNodes;
      });
      
      // Update global improvement
      setGlobalImprovement(prev => prev + improvement * 0.1);
      
      // Show a toast for the contribution
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
