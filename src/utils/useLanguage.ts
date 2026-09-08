import { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

// Mapping of language identifiers to their respective CodeMirror extensions.
const languageMap: Record<string, Extension[]> = {
  javascript: [javascript()],
  python: [python()],
  html: [html()],
};

/**
 * Returns an array of CodeMirror extensions appropriate for the given language.
 * Falls back to JavaScript extensions if the language is unknown.
 */
export function useLanguage(lang: string): Extension[] {
  const key = lang.toLowerCase();
  return languageMap[key] ?? languageMap['javascript'];
}
