import { useState, useEffect } from "react";

export type Language = "javascript" | "python" | "html";

const STORAGE_KEY = "collab-editor-language";

export function useLanguage(initial: Language = "javascript"): [Language, (lang: Language) => void] {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (
      stored &&
      (stored === "javascript" || stored === "python" || stored === "html")
    ) {
      return stored as Language;
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return [language, changeLanguage];
}
