"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

export type Language = "EN" | "PT";

const messages = {
  EN: en,
  PT: pt,
};

type Messages = typeof en;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  messages: Messages;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      messages: messages[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}