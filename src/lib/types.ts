
export interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  tokenBalance: number;
  contributionCount: number;
  joinedAt: Date;
}

export interface Contribution {
  id: string;
  userId: string;
  imageId: string;
  timestamp: Date;
  modelImprovement: number;
  tokensEarned: number;
}

export interface GhibliImage {
  id: string;
  userId: string;
  originalUrl: string;
  transformedUrl: string;
  createdAt: Date;
}

export interface ModelNode {
  id: string;
  location: string;
  lastContribution: Date;
  improvement: number;
}

export interface NFT {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  createdAt: Date;
}

export interface Royalty {
  id: string;
  recipient: string;
  amount: number;
  timestamp: Date;
}

// Mock data functions
export const generateMockUser = (): User => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    email: "user@example.com",
    tokenBalance: Math.floor(Math.random() * 1000) / 10,
    contributionCount: Math.floor(Math.random() * 30),
    joinedAt: new Date(Date.now() - Math.random() * 10000000000)
  };
};

export const generateMockContributions = (userId: string, count: number): Contribution[] => {
  return Array(count).fill(null).map((_, i) => ({
    id: Math.random().toString(36).substring(2, 9),
    userId,
    imageId: Math.random().toString(36).substring(2, 9),
    timestamp: new Date(Date.now() - Math.random() * 10000000000),
    modelImprovement: Math.random() * 0.5,
    tokensEarned: Math.floor(Math.random() * 100) / 10
  }));
};

export const generateMockNFTs = (userId: string, count: number): NFT[] => {
  return Array(count).fill(null).map((_, i) => ({
    id: Math.random().toString(36).substring(2, 9),
    userId,
    imageUrl: `https://picsum.photos/seed/${Math.random()}/300/300`,
    name: `Ghibli Contribution #${i+1}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000)
  }));
};

export const generateMockRoyalties = (count: number): Royalty[] => {
  const recipients = [
    "Hayao Miyazaki's estate",
    "Studio Ghibli Foundation",
    "Isao Takahata Memorial Fund",
    "Joe Hisaishi",
    "Ghibli Artists Collective"
  ];
  
  return Array(count).fill(null).map(() => ({
    id: Math.random().toString(36).substring(2, 9),
    recipient: recipients[Math.floor(Math.random() * recipients.length)],
    amount: Math.floor(Math.random() * 100) / 100,
    timestamp: new Date(Date.now() - Math.random() * 10000000000)
  }));
};

export const generateMockNodes = (count: number): ModelNode[] => {
  const locations = [
    "Tokyo", "New York", "London", "Paris", "Sydney", 
    "Berlin", "Toronto", "Singapore", "Mumbai", "São Paulo",
    "Cape Town", "Mexico City", "Oslo", "Cairo", "Seoul"
  ];
  
  return Array(count).fill(null).map(() => ({
    id: Math.random().toString(36).substring(2, 9),
    location: locations[Math.floor(Math.random() * locations.length)],
    lastContribution: new Date(Date.now() - Math.random() * 86400000),
    improvement: Math.random() * 0.5
  }));
};
