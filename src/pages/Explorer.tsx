
import ModelExplorer from "@/components/ModelExplorer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Explorer = () => {
  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Model Explorer</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          See how devices around the world collaborate while preserving privacy
        </p>
        <ModelExplorer />
        
        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[20%] left-[8%] w-6 h-6 rounded-full bg-ghibli-blue opacity-20 animate-float"></div>
          <div className="absolute bottom-[30%] left-[12%] w-4 h-4 rounded-full bg-ghibli-pink opacity-30 animate-float-delayed"></div>
          <div className="absolute top-[25%] right-[10%] w-5 h-5 rounded-full bg-ghibli-purple opacity-20 animate-float"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explorer;
