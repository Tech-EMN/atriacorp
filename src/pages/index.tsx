import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Componentes organizados
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { AboutUs } from "@/components/AboutUs";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Diagnostico } from "@/components/Diagnostico";
import { TelaIdeia } from "@/components/TelaIdeia";

export default function IndexPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDiagnostico, setShowDiagnostico] = useState(false);
  const [showIdeia, setShowIdeia] = useState(false);

  useEffect(() => {
    function checkResolution() {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    // Checa na primeira montagem
    checkResolution();

    // Adiciona listener para escutar resize
    window.addEventListener('resize', checkResolution);

    // Remove o listener ao desmontar
    return () => {
      window.removeEventListener('resize', checkResolution);
    };
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Page View Conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17727916408/K5ttCOyI-8YbEPiSqoVC'
        });
      }
    }, 3500); // 3.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'diagnostico') {
      setShowDiagnostico(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const openDiagnostico = () => {
    setShowDiagnostico(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openIdeia = () => {
    setShowIdeia(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showDiagnostico) {
    return <Diagnostico onVoltar={() => setShowDiagnostico(false)} />;
  }

  if (showIdeia) {
    return <TelaIdeia onVoltar={() => setShowIdeia(false)} />;
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <DefaultLayout scrollToSection={scrollToSection} onOpenDiagnostico={openDiagnostico}>
        <motion.main 
          className="flex w-full justify-center px-6 mt-56 bg-[#030A0D] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: isLoading ? 0 : 0.5 }}
        >
          {/* Light beam effects */}
        <div className="absolute top-[-900px] left-[60%] transform -translate-x-1/2 rotate-[27deg] w-[400px] h-[1200px] rounded-full blur-[80px] opacity-30 z-20 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #FFFFFF 0%, transparent 60%)'}}></div>
        <div className="absolute top-[-500px] left-1/2 transform -translate-x-1/2 rotate-[27deg] w-[500px] h-[1280px] rounded-full blur-[100px] opacity-40 z-30 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 70%)'}}></div>
        <div className="absolute top-[-600px] right-[-200px] transform rotate-[27deg] w-[350px] h-[900px] rounded-full blur-[70px] opacity-45 z-25 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 65%)'}}></div>
        
        <div className="flex w-full max-w-7xl flex-col gap-40 z-10">
            <Hero isMobile={isMobile} scrollToSection={scrollToSection} onOpenDiagnostico={openDiagnostico} onOpenIdeia={openIdeia} />
            <CTA onOpenDiagnostico={openDiagnostico} onOpenIdeia={openIdeia} />
            <Solutions isMobile={isMobile} onOpenDiagnostico={openDiagnostico} />
            <HowItWorks />
            <Benefits isMobile={isMobile} onOpenDiagnostico={openDiagnostico} />
            <AboutUs />
            <Footer isMobile={isMobile} scrollToSection={scrollToSection} onOpenDiagnostico={openDiagnostico} />
        </div>
        </motion.main>
      </DefaultLayout>
    </>
  );
}
