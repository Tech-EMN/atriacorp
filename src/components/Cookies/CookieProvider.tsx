import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import CookieBanner from "./CookieBanner";
import CookieSettingsModal from "./CookieSettingsModal";
import { loadScript, removeScript } from "../../utils/scriptLoader";

export type CookieCategory = "necessary" | "statistics" | "marketing";

export type ConsentState = {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
};



const COOKIE_KEY = "site_cookie_consent_v1";

type CookieContextType = {
  consent: ConsentState | null;
  setConsent: (next: ConsentState) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieContext = () => {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookieContext must be used within CookieProvider");
  return ctx;
};

export default function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // read from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(COOKIE_KEY);
      if (raw) {
        setConsentState(JSON.parse(raw));
      } else {
        // null -> banner shows
        setConsentState(null);
      }
    } catch {
      setConsentState(null);
    }
  }, []);

  // effect: whenever consent is set, persist + apply script changes
  useEffect(() => {
    if (!consent) return;
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));

    // Example: load analytics only if statistics accepted
    if (consent.statistics) {
      // load GA example (substitua com seu ID)
      loadScript({ id: "ga", src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX", async: true })
        .then(() => {
          // inicializar GA (exemplo)
          // @ts-ignore
          if (window && !(window as any).gtag) {
            // @ts-ignore
            (window as any).dataLayer = (window as any).dataLayer || [];
            // @ts-ignore
            function gtag(){(window as any).dataLayer.push(arguments);}
            // @ts-ignore
            (window as any).gtag = gtag;
            // @ts-ignore
            (window as any).gtag('js', new Date());
            // @ts-ignore
            (window as any).gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
          }
        })
        .catch(() => console.warn("Falha ao carregar script de estatísticas"));
    } else {
      removeScript("ga");
      // também é bom limpar cookies/identificadores desses serviços, se aplicável
    }

    // Marketing scripts
    if (consent.marketing) {
      loadScript({ id: "fb-pixel", src: "https://connect.facebook.net/en_US/fbevents.js", async: true })
        .catch(() => console.warn("Falha ao carregar pixel marketing"));
    } else {
      removeScript("fb-pixel");
    }

  }, [consent]);

  const setConsent = (next: ConsentState) => {
    // force necessary = true
    const normalized = { ...next, necessary: true };
    setConsentState(normalized);
  };

  const value = useMemo(
    () => ({
      consent,
      setConsent,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [consent]
  );

  return (
    <CookieContext.Provider value={value}>
      {children}
      <CookieBanner />
      <CookieSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </CookieContext.Provider>
  );
}
