
import ResultDisplay from "@/components/ResultDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Result = () => {
  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <ResultDisplay />
        
        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[20%] left-[10%] w-6 h-6 rounded-full bg-ghibli-pink opacity-20 animate-float"></div>
          <div className="absolute bottom-[30%] left-[15%] w-5 h-5 rounded-full bg-ghibli-blue opacity-30 animate-float-delayed"></div>
          <div className="absolute top-[25%] right-[10%] w-8 h-8 rounded-full bg-ghibli-green opacity-20 animate-float"></div>
          <div className="absolute bottom-[25%] right-[20%] w-4 h-4 rounded-full bg-ghibli-purple opacity-30 animate-float-delayed"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Result;
