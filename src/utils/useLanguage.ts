import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";

export type Language = "javascript" | "python" | "html";

export const languageExtensions: Record<Language, Extension> = {
  javascript: javascript(),
  python: python(),
  html: html(),
};

/**
 * Returns the CodeMirror language extension for the given language identifier.
 * Defaults to JavaScript if an unknown language is supplied.
 */
export const useLanguage = (language: Language): Extension => {
  return languageExtensions[language] ?? languageExtensions.javascript;
};
