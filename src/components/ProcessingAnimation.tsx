
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

interface ProcessingAnimationProps {
  autoRedirect?: boolean;
  redirectDelay?: number;
}

const ProcessingAnimation = ({ autoRedirect = true, redirectDelay = 5000 }: ProcessingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, 10 - Math.floor(prev / 10));
        const newProgress = Math.min(100, prev + increment);
        return newProgress;
      });
    }, 300);

    // Redirect after processing is complete
    if (autoRedirect) {
      const timeout = setTimeout(() => {
        navigate("/result");
      }, redirectDelay);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    
    return () => clearInterval(interval);
  }, [navigate, autoRedirect, redirectDelay]);

  return (
    <div className="ghibli-card w-full max-w-md p-8 text-center">
      <div className="mb-6">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-ghibli-purple bg-opacity-20 animate-pulse-gentle"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <Brain className="h-10 w-10 text-ghibli-purple animate-float" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-ghibli-blue opacity-50 animate-float"></div>
          <div className="absolute top-2 -right-2 w-2 h-2 rounded-full bg-ghibli-pink opacity-70 animate-float-delayed"></div>
          <div className="absolute -bottom-2 left-2 w-4 h-4 rounded-full bg-ghibli-green opacity-40 animate-float"></div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-3">Magic in Progress</h2>
      
      <p className="text-muted-foreground mb-6">
        Your device is training the Ghibli brain privately...
      </p>
      
      <div className="mb-4">
        <Progress value={progress} className="h-2 bg-ghibli-brown bg-opacity-20" />
      </div>
      
      <div className="text-sm text-muted-foreground">
        {progress < 30 && "Analyzing image details..."}
        {progress >= 30 && progress < 60 && "Learning Ghibli patterns..."}
        {progress >= 60 && progress < 90 && "Adding whimsical touches..."}
        {progress >= 90 && "Almost ready..."}
      </div>
    </div>
  );
};

export default ProcessingAnimation;
