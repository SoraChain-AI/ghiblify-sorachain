
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Server, Cloud, ServerCog } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define provider types and their details
const computeProviders = [
  {
    type: "cloud",
    name: "Microsoft Azure",
    icon: Cloud,
    description: "Enterprise-grade cloud compute with advanced ML capabilities",
    color: "text-blue-600"
  },
  {
    type: "cloud",
    name: "AWS",
    icon: Cloud,
    description: "Scalable, high-performance cloud computing infrastructure",
    color: "text-orange-500"
  },
  {
    type: "cloud",
    name: "Google Cloud",
    icon: Cloud,
    description: "AI-optimized compute with TPU access for deep learning",
    color: "text-green-500"
  },
  {
    type: "decentralized",
    name: "Aethir",
    icon: ServerCog,
    description: "Decentralized GPU marketplace for high-performance compute",
    color: "text-purple-600"
  },
  {
    type: "decentralized",
    name: "Render",
    icon: Server,
    description: "Distributed compute network with pay-as-you-go pricing",
    color: "text-teal-500"
  }
];

const ComputeProviders = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [open, setOpen] = useState(false);
  
  // Filter providers based on selected type
  const filteredProviders = selectedType === "all" 
    ? computeProviders 
    : computeProviders.filter(provider => provider.type === selectedType);
  
  return (
    <div className="mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="ghibli-button-secondary">
            <ServerCog className="h-5 w-5 mr-2" />
            Connect Compute
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md ghibli-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Connect to Compute Providers</DialogTitle>
            <DialogDescription>
              Access additional computing resources to enhance your image transformations
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Provider Type</h3>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="cloud">Cloud Providers</SelectItem>
                  <SelectItem value="decentralized">Decentralized</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {filteredProviders.map((provider) => (
                <div 
                  key={provider.name} 
                  className="flex items-center p-3 border rounded-lg hover:bg-ghibli-cream/50 transition-colors cursor-pointer"
                  onClick={() => {
                    // Here you would implement the connection logic
                    console.log(`Selected provider: ${provider.name}`);
                    setOpen(false);
                  }}
                >
                  <div className={`p-2 rounded-full bg-opacity-20 ${provider.color.replace('text', 'bg')}`}>
                    <provider.icon className={`h-5 w-5 ${provider.color}`} />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Additional compute may incur charges from the selected provider
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComputeProviders;
