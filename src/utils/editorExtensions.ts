import { editor } from 'monaco-editor';
import { Language } from '../types';

export const setEditorLanguage = (model: editor.ITextModel, language: Language) => {
  const monacoLang = language === 'javascript' ? 'javascript' : language === 'python' ? 'python' : 'html';
  editor.setModelLanguage(model, monacoLang);
};

export const createCursorDecoration = (
  editorInstance: editor.IStandaloneCodeEditor,
  userId: string,
  color: string,
  name: string
) => {
  const decorations: string[] = [];
  const update = (position: editor.IPosition) => {
    const range = new editor.Range(
      position.lineNumber,
      position.column,
      position.lineNumber,
      position.column
    );
    const newDec = editorInstance.deltaDecorations(
      decorations,
      [
        {
          range,
          options: {
            className: 'remote-cursor',
            afterContentClassName: 'cursor-label',
            overviewRuler: {
              color,
              position: editor.OverviewRulerLane.Right
            }
          }
        }
      ]
    );
    decorations.splice(0, decorations.length, ...newDec);
  };
  return { update };
};