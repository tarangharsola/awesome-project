// src/utils/useFormattingDefaults.ts
import { Extension } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';

/**
 * Returns formatting extensions based on the selected language.
 * Currently adjusts tab/indent size.
 */
export const useFormattingDefaults = (language: string): { extensions: Extension[] } => {
  const tabSize = language === 'python' ? 4 : 2;
  const extensions: Extension[] = [indentUnit.of(' '.repeat(tabSize))];
  return { extensions };
};