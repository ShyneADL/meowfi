import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Swap } from "./sections/Swap";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loadTimer: NodeJS.Timeout;

    const handleLoad = () => {
      loadTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Loader isLoading={isLoading} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[#561E05] z-[500000] transition-opacity duration-1000 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/images/small-cat.webp"
          alt="Meowfi Logo"
          className="w-24 h-auto mb-5"
        />
        <div className="font-Rainball text-white text-2xl">
          Loading<span className="loader-dots"></span>
        </div>
      </div>
    </div>
  );
};
