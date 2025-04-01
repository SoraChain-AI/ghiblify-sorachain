
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Cloud, Upload, BarChart4, Layers, User } from "lucide-react";
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white bg-opacity-80 backdrop-blur-sm border-b border-ghibli-brown border-opacity-20 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <Cloud className="h-7 w-7 text-ghibli-dark-blue group-hover:animate-float" />
          <span className="text-2xl font-bold bg-gradient-to-r from-ghibli-dark-blue to-ghibli-purple bg-clip-text text-transparent">
            Ghiblify
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          <NavLink to="/upload" isActive={isActive("/upload")}>
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </NavLink>
          
          <NavLink to="/explorer" isActive={isActive("/explorer")}>
            <BarChart4 className="h-4 w-4 mr-1" />
            Explorer
          </NavLink>
          
          <NavLink to="/dashboard" isActive={isActive("/dashboard")}>
            <Layers className="h-4 w-4 mr-1" />
            Dashboard
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5">
            <span className="text-ghibli-purple font-medium">200 ST</span>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  children, 
  isActive 
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link 
    to={to}
    className={cn(
      "px-4 py-2 rounded-full flex items-center text-sm font-medium transition-colors",
      isActive 
        ? "bg-gradient-to-r from-ghibli-blue to-ghibli-purple text-foreground" 
        : "hover:bg-ghibli-cream hover:text-foreground"
    )}
  >
    {children}
  </Link>
);

export default Header;
