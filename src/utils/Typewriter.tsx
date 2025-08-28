import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    children?: React.ReactNode;
}

export function TypewriterText({ text, className, delay = 0, speed = 50, children }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const timer = setTimeout(() => {
            setIsTyping(true);
            let i = 0;
            const typeTimer = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.slice(0, i + 1));
                    // Mostra os children quando está no meio da digitação (para aparecer junto com o nome)
                    if (children && i >= Math.floor(text.length * 0.5)) {
                        setShowChildren(true);
                    }
                    i++;
                } else {
                    clearInterval(typeTimer);
                    setIsTyping(false);
                    setShowChildren(true);
                }
            }, speed);

            return () => clearInterval(typeTimer);
        }, delay);

        return () => clearTimeout(timer);
    }, [isInView, text, delay, speed, children]);

    return (
        <span ref={ref} className={className}>
            {displayedText}
            {showChildren && children}
            {isTyping && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-6 bg-white ml-1"
                />
            )}
        </span>
    );
}