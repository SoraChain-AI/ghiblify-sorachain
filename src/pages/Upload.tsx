
import ImageUpload from "@/components/ImageUpload";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Upload = () => {
  return (
    <div className="min-h-screen bg-ghibli-cream paper-texture flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Upload Your Image</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Choose any image to transform it into beautiful Ghibli-style art
        </p>
        <ImageUpload />
        
        {/* Floating elements */}
        <div className="hidden md:block">
          <div className="absolute top-[30%] left-[10%] w-6 h-6 rounded-full bg-ghibli-blue opacity-20 animate-float"></div>
          <div className="absolute top-[60%] left-[20%] w-4 h-4 rounded-full bg-ghibli-pink opacity-20 animate-float-delayed"></div>
          <div className="absolute top-[25%] right-[15%] w-8 h-8 rounded-full bg-ghibli-green opacity-20 animate-float"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
