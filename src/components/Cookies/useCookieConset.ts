import { useCookieContext } from "./CookieProvider";
import { useMemo } from "react";

export function useCookieConsent() {
  const ctx = useCookieContext();

  const isAccepted = useMemo(() => {
    if (!ctx.consent) return { necessary: false, statistics: false, marketing: false };
    return ctx.consent;
  }, [ctx.consent]);

  return {
    consent: ctx.consent,
    accepted: isAccepted,
    openSettings: ctx.openSettings,
    setConsent: ctx.setConsent,
  };
}
