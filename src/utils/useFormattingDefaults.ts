/**
 * Returns language‑specific formatting defaults for the Monaco editor.
 * Currently configures tab size and whether to insert spaces.
 */
export default function useFormattingDefaults(language: string) {
  const defaults: monaco.editor.IStandaloneEditorConstructionOptions = {
    insertSpaces: true,
    automaticLayout: true,
    tabSize: 2,
  };

  switch (language) {
    case 'python':
      defaults.tabSize = 4;
      break;
    case 'html':
      defaults.tabSize = 2;
      break;
    case 'javascript':
    default:
      defaults.tabSize = 2;
      break;
  }

  return defaults;
}
