import { createContext, useContext, type ReactNode } from "react";
import { translations } from "@/lib/i18n";

type LangContextValue = {
  t: typeof translations;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  return (
    <LangContext.Provider value={{ t: translations }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
