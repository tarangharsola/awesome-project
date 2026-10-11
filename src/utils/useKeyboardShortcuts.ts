import { useEffect } from 'react';
import { formatCode } from './formatCode';

export const useKeyboardShortcuts = (getEditorModel: () => any, language: string) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Format shortcut: Ctrl+Shift+F
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        const model = getEditorModel();
        if (model) {
          const formatted = formatCode(model.getValue(), language);
          model.setValue(formatted);
        }
      }
      // Focus language selector: Ctrl+L
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const selector = document.querySelector('.language-selector') as HTMLElement;
        selector?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [getEditorModel, language]);
};
