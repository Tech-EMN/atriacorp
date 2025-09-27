
import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import PoliticaDePrivacidade from "@/pages/politica-de-privacidade";
import TermosDeUso from "@/pages/termos-de-uso";
import DefaultLayout from "@/layouts/default";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
  <Route element={<PoliticaDePrivacidadePageWrapper />} path="/politica-de-privacidade" />
  <Route element={<TermosDeUsoPageWrapper />} path="/termos-de-uso" />
    </Routes>
  );
}

// Wrapper para garantir fundo branco e não usar o layout escuro
import { motion } from "framer-motion";

function PoliticaDePrivacidadePageWrapper() {
  return (
    <DefaultLayout>
      <motion.main 
        className="flex w-full justify-center px-6 mt-56 bg-[#030A0D] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Light beam effects */}
        <div className="absolute top-[-900px] left-[60%] transform -translate-x-1/2 rotate-[27deg] w-[400px] h-[1200px] rounded-full blur-[80px] opacity-30 z-20 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #FFFFFF 0%, transparent 60%)'}}></div>
        <div className="absolute top-[-500px] left-1/2 transform -translate-x-1/2 rotate-[27deg] w-[500px] h-[1280px] rounded-full blur-[100px] opacity-40 z-30 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 70%)'}}></div>
        <div className="absolute top-[-600px] right-[-200px] transform rotate-[27deg] w-[350px] h-[900px] rounded-full blur-[70px] opacity-45 z-25 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 65%)'}}></div>
        <div className="flex w-full max-w-7xl flex-col gap-40 z-10">
          <div className="flex justify-center">
            <PoliticaDePrivacidade />
          </div>
        </div>
      </motion.main>
    </DefaultLayout>
  );
}

export default App;

function TermosDeUsoPageWrapper() {
  return (
    <DefaultLayout>
      <motion.main 
        className="flex w-full justify-center px-6 mt-56 bg-[#030A0D] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Light beam effects */}
        <div className="absolute top-[-900px] left-[60%] transform -translate-x-1/2 rotate-[27deg] w-[400px] h-[1200px] rounded-full blur-[80px] opacity-30 z-20 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #FFFFFF 0%, transparent 60%)'}}></div>
        <div className="absolute top-[-500px] left-1/2 transform -translate-x-1/2 rotate-[27deg] w-[500px] h-[1280px] rounded-full blur-[100px] opacity-40 z-30 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 70%)'}}></div>
        <div className="absolute top-[-600px] right-[-200px] transform rotate-[27deg] w-[350px] h-[900px] rounded-full blur-[70px] opacity-45 z-25 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, #226785 0%, transparent 65%)'}}></div>
        <div className="flex w-full max-w-7xl flex-col gap-40 z-10">
          <div className="flex justify-center">
            <TermosDeUso />
          </div>
        </div>
      </motion.main>
    </DefaultLayout>
  );
}
