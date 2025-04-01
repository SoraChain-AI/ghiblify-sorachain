import { Heart } from "lucide-react";
const Footer = () => {
  return <footer className="w-full p-4 bg-white bg-opacity-70 backdrop-blur-sm border-t border-ghibli-brown border-opacity-20 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">Powered by SoraChain AI</div>
          
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-ghibli-pink animate-pulse-gentle" />
            <span>inspired by Studio Ghibli</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;