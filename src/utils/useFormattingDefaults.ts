import { Extension } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';

/**
 * Provides default formatting extensions based on the selected language.
 * Currently sets the indent unit (tab size) appropriate for each language.
 */
export function useFormattingDefaults(language: string): Extension {
  let unit = 2; // default indent size
  switch (language) {
    case 'javascript':
    case 'html':
      unit = 2;
      break;
    case 'python':
      unit = 4;
      break;
    default:
      unit = 2;
  }
  return indentUnit.of(unit);
}
