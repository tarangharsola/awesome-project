import * as monaco from 'monaco-editor';
import { Language } from './useLanguage';

/**
 * Configure the Monaco editor instance with the selected language.
 * This helper isolates the editor‑specific API calls, making the component
 * code easier to read and test.
 */
export const configureEditor = (
  editor: monaco.editor.IStandaloneCodeEditor,
  language: Language
): void => {
  const model = editor.getModel();
  if (model) {
    monaco.editor.setModelLanguage(model, language);
  }
};

export default configureEditor;
