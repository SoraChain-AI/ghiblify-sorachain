
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import { Cloud, Image, Brain, ShieldCheck } from "lucide-react";

const Index = () => {
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
              Transform Your Photos Into{" "}
              <span className="bg-gradient-to-r from-ghibli-dark-blue to-ghibli-purple bg-clip-text text-transparent">
                Ghibli Magic
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Experience the wonder of Studio Ghibli-style art while helping train AI through private, on-device federated learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button asChild className="ghibli-button">
                <Link to="/upload">
                  <Image className="h-5 w-5 mr-2" />
                  Transform Image
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-ghibli-brown border-opacity-20">
                <Link to="/explorer">
                  Explore AI Model
                </Link>
              </Button>
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
