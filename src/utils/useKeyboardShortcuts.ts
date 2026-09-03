import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatDocument } from '../store/editorActions'; // assume an action to format

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl+S or Cmd+S -> prevent default (could trigger save in future)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      // Placeholder: could dispatch a save action
    }
    // Ctrl+Shift+F / Cmd+Shift+F -> format document
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      dispatch(formatDocument());
    }
  };

  const bindShortcuts = () => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  };

  // Optionally bind on mount if component wants automatic binding
  useEffect(() => {
    const unbind = bindShortcuts();
    return () => {
      unbind();
    };
  }, []);

  return { bindShortcuts };
};
