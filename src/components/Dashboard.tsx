import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Coins, ImageIcon, Award, Receipt } from "lucide-react";
import { User, Contribution, NFT, Royalty, generateMockContributions, generateMockRoyalties } from "@/lib/types";
import { sampleImages, transformedImageMap } from "@/components/sample-images/imageData";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [contributions] = useState<Contribution[]>(generateMockContributions(user.id, 8));
  
  const generateConsistentNFTs = (userId: string): NFT[] => {
    const nfts: NFT[] = [];
    
    sampleImages.forEach((image, index) => {
      nfts.push({
        id: `original-${image.id}`,
        userId,
        imageUrl: image.url,
        name: `Original: ${image.name}`,
        createdAt: new Date(Date.now() - Math.random() * 10000000000)
      });
      
      if (transformedImageMap[image.url]) {
        nfts.push({
          id: `transformed-${image.id}`,
          userId,
          imageUrl: transformedImageMap[image.url],
          name: `Transformed: ${image.name}`,
          createdAt: new Date(Date.now() - Math.random() * 5000000000)
        });
      }
    });
    
    return nfts;
  };
  
  const [nfts] = useState<NFT[]>(generateConsistentNFTs(user.id));
  const [royalties] = useState<Royalty[]>(generateMockRoyalties(10));
  
  const chartData = contributions
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((contribution) => ({
      date: new Date(contribution.timestamp).toLocaleDateString(),
      tokens: contribution.tokensEarned,
      improvement: contribution.modelImprovement * 100,
    }));

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard 
          title="Token Balance" 
          value={`${user.tokenBalance.toFixed(1)} $SORA`}
          description="Your earned $SORA"
          icon={<Coins className="h-5 w-5" />}
          iconColor="text-ghibli-purple"
          iconBg="bg-ghibli-purple bg-opacity-20"
        />
        
        <DashboardCard 
          title="Contributions" 
          value={user.contributionCount.toString()}
          description="Total images transformed"
          icon={<ImageIcon className="h-5 w-5" />}
          iconColor="text-ghibli-dark-blue"
          iconBg="bg-ghibli-blue bg-opacity-30"
        />
        
        <DashboardCard 
          title="NFTs Minted" 
          value={nfts.length.toString()}
          description="Proof of contributions"
          icon={<Award className="h-5 w-5" />}
          iconColor="text-ghibli-dark-green"
          iconBg="bg-ghibli-green bg-opacity-30"
        />
      </div>
      
      <Tabs defaultValue="contributions" className="ghibli-card p-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="nft-gallery">NFT Gallery</TabsTrigger>
          <TabsTrigger value="royalties">Royalties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contributions">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contribution History</h3>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8FB3DE" />
                  <YAxis yAxisId="right" orientation="right" stroke="#A6D9C7" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="tokens" fill="#8FB3DE" name="Tokens Earned" />
                  <Bar yAxisId="right" dataKey="improvement" fill="#A6D9C7" name="Model Improvement (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {contributions.slice(0, 5).map((contribution) => (
                <div 
                  key={contribution.id}
                  className="p-3 border border-ghibli-brown border-opacity-20 rounded-lg flex items-center justify-between bg-white bg-opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-black bg-opacity-10 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{`Contribution #${contribution.id}`}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(contribution.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-ghibli-purple">+{contribution.tokensEarned} ST</p>
                    <p className="text-xs text-muted-foreground">
                      {(contribution.modelImprovement * 100).toFixed(2)}% improvement
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nft-gallery">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Proof of Contribution NFTs</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <div 
                  key={nft.id}
                  className="rounded-lg overflow-hidden border border-ghibli-brown border-opacity-20 bg-white"
                >
                  <img 
                    src={nft.imageUrl} 
                    alt={nft.name}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      console.error(`Failed to load NFT image: ${nft.imageUrl}`);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=500&auto=format";
                    }}
                  />
                  <div className="p-3">
                    <h4 className="font-medium">{nft.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Minted on {new Date(nft.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="royalties">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Artist Royalty Payments</h3>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Receipt className="h-4 w-4" />
                <span>Transparently tracked on blockchain</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {royalties.map((royalty) => (
                <div 
                  key={royalty.id}
                  className="p-3 border border-ghibli-brown border-opacity-20 rounded-lg flex items-center justify-between bg-white bg-opacity-50"
                >
                  <div>
                    <p className="font-medium">{royalty.recipient}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(royalty.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <p className="font-medium text-ghibli-dark-green">
                    {royalty.amount.toFixed(3)} $SORA
                  </p>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              A portion of all SoraChain activity is distributed to original artists and creators
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

const DashboardCard = ({ title, value, description, icon, iconColor, iconBg }: DashboardCardProps) => {
  return (
    <Card className="border-ghibli-brown border-opacity-20 bg-white bg-opacity-80">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className={`p-2 rounded-full ${iconBg}`}>
            <div className={`${iconColor}`}>{icon}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
