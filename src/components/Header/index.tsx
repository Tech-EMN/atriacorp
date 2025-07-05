import { Button } from "@heroui/button";
import { HeaderItem } from "./headerItem";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
    scrollToSection?: (sectionId: string) => void;
    onOpenDiagnostico?: () => void;
}

export function Header({ scrollToSection, onOpenDiagnostico }: HeaderProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const menuItems = [
        { label: "Inicio", sectionId: "inicio" },
        { label: "Soluções", sectionId: "solucoes" },
        { label: "Como funciona", sectionId: "como-funciona" },
        { label: "Benefícios", sectionId: "beneficios" },
        { label: "Sobre nós", sectionId: "sobre-nos" }
    ];

    useEffect(() => {
        function checkResolution() {
            setIsMobile(window.innerWidth < 1024);
        }

        function handleScroll() {
            setIsScrolled(window.scrollY > 0);
        }

        checkResolution();
        handleScroll();
        
        window.addEventListener('resize', checkResolution);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkResolution);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuClick = (sectionId: string) => {
        scrollToSection?.(sectionId);
        setIsDrawerOpen(false);
    };

    return (
        <>
            <aside className={`fixed left-6 right-6 z-50 transition-all duration-300 border border-transparent ${
                isScrolled 
                    ? 'top-4 backdrop-blur-md bg-black/20 border-white/10 rounded-2xl shadow-lg' 
                    : 'top-0'
            }`}>
                <div className="flex items-center justify-between p-4">
                    <img
                        src="/logo.svg"
                        alt="logo"
                        className="shrink-0"
                    />

                    {!isMobile && (
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                {menuItems.map((item) => (
                                    <HeaderItem
                                        key={item.sectionId}
                                        item={item.label}
                                        onClick={() => scrollToSection?.(item.sectionId)}
                                    />
                                ))}
                            </div>

                            <Button
                                className="bg-headerButton text-textButton font-semibold text-sm rounded-full"
                                onPress={() => onOpenDiagnostico?.()}
                            >
                                Fazer Diagnóstico
                            </Button>
                        </div>
                    )}

                    {isMobile && (
                        <div className="flex items-center gap-4">
                            <Button
                                className="bg-headerButton text-textButton font-semibold text-sm rounded-full"
                                onPress={() => onOpenDiagnostico?.()}
                            >
                                Diagnóstico
                            </Button>
                            <Button
                                isIconOnly
                                className="bg-transparent text-white"
                                onPress={() => setIsDrawerOpen(true)}
                            >
                                <HiMenuAlt3 size={24} />
                            </Button>
                        </div>
                    )}
                </div>
            </aside>

            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsDrawerOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 right-0 h-full w-full md:w-80 bg-[#030A0D] border-l border-white/10 z-50"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <img
                                        src="/logo.svg"
                                        alt="logo"
                                        className="h-8"
                                    />
                                    <Button
                                        isIconOnly
                                        className="bg-transparent text-white"
                                        onPress={() => setIsDrawerOpen(false)}
                                    >
                                        <IoClose size={24} />
                                    </Button>
                                </div>

                                <div className="flex flex-col p-6 space-y-4">
                                    {menuItems.map((item) => (
                                        <Button
                                            key={item.sectionId}
                                            className="bg-transparent text-white text-left justify-start text-lg font-medium"
                                            onPress={() => handleMenuClick(item.sectionId)}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </div>

                                <div className="mt-auto p-6">
                                    <Button
                                        className="w-full bg-headerButton text-textButton font-semibold text-sm rounded-full"
                                        onPress={() => {
                                            onOpenDiagnostico?.();
                                            setIsDrawerOpen(false);
                                        }}
                                    >
                                        Fazer Diagnóstico
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}