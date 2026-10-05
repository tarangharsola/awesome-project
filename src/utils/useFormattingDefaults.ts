import { Language } from "./useLanguage";

export interface FormattingOptions {
  tabSize: number;
  insertSpaces: boolean;
  trimTrailingWhitespace?: boolean;
  formatOnSave?: boolean;
}

export function getFormattingDefaults(lang: Language): FormattingOptions {
  switch (lang) {
    case "javascript":
      return { tabSize: 2, insertSpaces: true, trimTrailingWhitespace: true, formatOnSave: true };
    case "python":
      return { tabSize: 4, insertSpaces: true, trimTrailingWhitespace: true, formatOnSave: true };
    case "html":
      return { tabSize: 2, insertSpaces: true, trimTrailingWhitespace: false, formatOnSave: false };
    default:
      return { tabSize: 2, insertSpaces: true };
  }
}
