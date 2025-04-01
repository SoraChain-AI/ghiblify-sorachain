
import DashboardComponent from "@/components/Dashboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateMockUser } from "@/lib/types";

const Dashboard = () => {
  // In a real app, this would be fetched from an API
  const user = generateMockUser();
  
  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Your Dashboard</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Track your contributions, tokens and impact
        </p>
        <DashboardComponent user={user} />
        
        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[15%] left-[8%] w-6 h-6 rounded-full bg-ghibli-green opacity-20 animate-float"></div>
          <div className="absolute bottom-[20%] left-[15%] w-4 h-4 rounded-full bg-ghibli-purple opacity-30 animate-float-delayed"></div>
          <div className="absolute top-[20%] right-[10%] w-8 h-8 rounded-full bg-ghibli-blue opacity-20 animate-float"></div>
          <div className="absolute bottom-[25%] right-[12%] w-5 h-5 rounded-full bg-ghibli-pink opacity-20 animate-float-delayed"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
