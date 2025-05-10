
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import { Cloud, Image, Brain, ShieldCheck } from "lucide-react";
import ComputeProviders from "@/components/ComputeProviders";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show the loading animation briefly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col items-center justify-center">
        <img 
          src="/lovable-uploads/cbb2f12d-7a3e-43f0-a48c-f144b7792ce5.png" 
          alt="Ghiblify Logo" 
          className="w-24 h-24 animate-bounce mb-4" 
        />
        <div className="text-xl font-medium text-ghibli-dark-green">Loading Ghiblify...</div>
        <div className="mt-8 flex space-x-2">
          <div className="w-3 h-3 bg-ghibli-purple rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-ghibli-blue rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-ghibli-green rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Hero content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center rounded-full bg-ghibli-blue bg-opacity-30 px-3 py-1 text-sm mb-6">
              <Cloud className="h-4 w-4 mr-1 text-ghibli-dark-blue" />
              <span>Powered by SoraChain AI</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your <span className="text-ghibli-dark-green">Private</span> Photos Into{" "}
              <span className="bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent">
                Ghibli Art
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Experience the wonder of Studio Ghibli-style art while helping train AI through private, on-device <span className="font-bold text-[#6B46C1]">federated learning</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
              <Button asChild className="ghibli-button w-full sm:w-auto">
                <Link to="/upload">
                  <Image className="h-5 w-5 mr-2" />
                  Transform Image
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-ghibli-brown border-opacity-20 w-full sm:w-auto">
                <Link to="/explorer">
                  Explore AI Model
                </Link>
              </Button>
              
              <ComputeProviders />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto md:mx-0">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-full bg-ghibli-green bg-opacity-30">
                  <ShieldCheck className="h-4 w-4 text-ghibli-dark-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Privacy Preserved</h3>
                  <p className="text-sm text-muted-foreground">
                    Your images never leave your device
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-full bg-ghibli-pink bg-opacity-30">
                  <Brain className="h-4 w-4 text-ghibli-purple" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Earn While You Create</h3>
                  <p className="text-sm text-muted-foreground">
                    Get $SORA for AI contributions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login form */}
          <div className="w-full md:w-auto md:min-w-[400px] mt-8 md:mt-0">
            <LoginForm />
          </div>
        </div>

        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[20%] left-[15%] w-6 h-6 rounded-full bg-ghibli-blue opacity-30 animate-float"></div>
          <div className="absolute top-[60%] left-[8%] w-4 h-4 rounded-full bg-ghibli-pink opacity-20 animate-float-delayed"></div>
          <div className="absolute top-[30%] right-[15%] w-8 h-8 rounded-full bg-ghibli-green opacity-20 animate-float"></div>
          <div className="absolute top-[70%] right-[10%] w-5 h-5 rounded-full bg-ghibli-purple opacity-10 animate-float-delayed"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
