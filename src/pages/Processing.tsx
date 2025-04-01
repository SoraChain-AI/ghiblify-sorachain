
import ProcessingAnimation from "@/components/ProcessingAnimation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Processing = () => {
  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Processing Your Image</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Your device is privately training the AI model with federated learning
        </p>
        <ProcessingAnimation />
        
        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[30%] left-[15%] w-6 h-6 rounded-full bg-ghibli-blue opacity-30 animate-float"></div>
          <div className="absolute top-[50%] left-[20%] w-4 h-4 rounded-full bg-ghibli-pink opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-[30%] left-[30%] w-5 h-5 rounded-full bg-ghibli-purple opacity-20 animate-float"></div>
          <div className="absolute top-[25%] right-[20%] w-8 h-8 rounded-full bg-ghibli-green opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-[40%] right-[25%] w-6 h-6 rounded-full bg-ghibli-peach opacity-30 animate-float"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Processing;
