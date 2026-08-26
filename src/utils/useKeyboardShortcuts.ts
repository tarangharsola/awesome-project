import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { applyFormattingDefaults } from './useFormattingDefaults';
import { useLanguage } from './useLanguage';

export const useKeyboardShortcuts = (view: EditorView | null) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (!view) return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S => format / apply defaults
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        applyFormattingDefaults(view, language);
      }
      // Ctrl/Cmd + Space => placeholder for autocomplete (future integration)
      if ((e.ctrlKey || e.metaKey) && e.key === ' ') {
        e.preventDefault();
        // Autocomplete logic could be added here.
      }
    };
    view.dom.addEventListener('keydown', handler);
    return () => {
      view.dom.removeEventListener('keydown', handler);
    };
  }, [view, language]);
};
