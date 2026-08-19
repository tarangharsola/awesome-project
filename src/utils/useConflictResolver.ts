import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEditor } from './useEditor';
import { useAwareness } from './hooks/useAwareness';

/**
 * Hook that sets up Yjs CRDT synchronization for a given room.
 * It binds the shared Y.Text to the editor instance, handles local
 * edits, remote updates, and user awareness (cursor + name).
 */
export const useConflictResolver = (roomId: string, username: string, color: string) => {
  const ydocRef = useRef<Y.Doc>();
  const providerRef = useRef<WebsocketProvider>();
  const { editor, setContent } = useEditor();

  // Initialize Yjs document and provider
  useEffect(() => {
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    const wsUrl = `${window.location.origin.replace(/^http/, 'ws')}/yjs`;
    const provider = new WebsocketProvider(wsUrl, roomId, ydoc);
    providerRef.current = provider;

    const yText = ydoc.getText('codemirror');

    // Populate editor with existing content or seed Yjs with editor content
    if (yText.length > 0) {
      setContent(yText.toString());
    } else {
      ydoc.transact(() => {
        yText.insert(0, editor.getValue());
      });
    }

    // Local editor changes -> Yjs
    const onEditorChange = () => {
      const value = editor.getValue();
      ydoc.transact(() => {
        yText.delete(0, yText.length);
        yText.insert(0, value);
      });
    };
    editor.on('change', onEditorChange);

    // Remote Yjs changes -> editor
    const yObserver = (event: Y.YTextEvent) => {
      const newValue = yText.toString();
      if (newValue !== editor.getValue()) {
        editor.setValue(newValue);
      }
    };
    yText.observe(yObserver);

    // Awareness (cursor + user info)
    const awareness = provider.awareness;
    awareness.setLocalStateField('user', { name: username, color });

    // Cleanup on unmount
    return () => {
      editor.off('change', onEditorChange);
      yText.unobserve(yObserver);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomId, username, color, editor, setContent]);

  // Expose provider for other hooks (e.g., useAwareness)
  return { provider: providerRef.current };
};