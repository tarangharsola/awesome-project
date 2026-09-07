import CodeMirror from 'codemirror';

/**
 * Sets the CodeMirror mode based on the selected language.
 */
export const setLanguageMode = (editor: CodeMirror.Editor, language: string): void => {
  const modeMap: Record<string, string> = {
    javascript: 'javascript',
    python: 'python',
    html: 'htmlmixed',
  };
  const mode = modeMap[language] || 'javascript';
  editor.setOption('mode', mode);
};
