
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock } from "lucide-react";
import WalletConnect from "./WalletConnect";

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an authentication service
    toast({
      title: isSignUp ? "Account created!" : "Welcome back!",
      description: "You've been successfully logged in.",
    });
    navigate("/upload");
  };

  return (
    <div className="ghibli-card w-full max-w-md p-6 md:p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{isSignUp ? "Create an account" : "Welcome back"}</h2>
        <p className="text-muted-foreground mt-2">
          {isSignUp 
            ? "Sign up to start creating magical transformations" 
            : "Sign in to continue your magical journey"}
        </p>
      </div>
      
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="Email address"
                className="ghibli-input pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="Password"
                className="ghibli-input pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="ghibli-button w-full"
          >
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-ghibli-brown border-opacity-20"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white bg-opacity-80 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>
        
        <WalletConnect />
        
        <div className="text-center text-sm">
          <button 
            className="text-primary hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
