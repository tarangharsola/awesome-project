import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useConflictResolver } from '../hooks/useConflictResolver';
import { useWebSocket } from '../hooks/useWebSocket';
import type { Operation } from '../types/conflict';
import type { WebSocketMessage } from '../types/websocketMessage';

interface EditorProps {
  language: 'javascript' | 'python' | 'html';
  sessionId: string;
  username: string;
}

export const Editor: React.FC<EditorProps> = ({ language, sessionId, username }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { applyLocal, applyRemote, getDocument } = useConflictResolver();
  const { connected, lastMessage, sendMessage } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/session/${sessionId}`
  });

  // Initialize CodeMirror editor.
  useEffect(() => {
    if (!editorRef.current) return;
    const langExtension =
      language === 'javascript'
        ? javascript()
        : language === 'python'
        ? python()
        : html();
    const view = new EditorView({
      doc: getDocument(),
      extensions: [basicSetup, langExtension],
      parent: editorRef.current,
      dispatch: (tr) => {
        view.update([tr]);
        if (tr.docChanged) {
          const changes = tr.changes;
          changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
            const op: Operation =
              inserted.length > 0
                ? { type: 'insert', index: fromA, text: inserted.toString() }
                : { type: 'delete', index: fromA, length: toA - fromA };
            const newDoc = applyLocal(op);
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: newDoc } });
            sendMessage({ type: 'operation', payload: { op, username } });
          });
        }
      }
    });
    return () => view.destroy();
  }, [language, sessionId, username, applyLocal, sendMessage]);

  // Handle incoming remote operations.
  useEffect(() => {
    if (!lastMessage || lastMessage.type !== 'operation') return;
    const { op, username: remoteUser } = lastMessage.payload as { op: Operation; username: string };
    if (remoteUser === username) return; // ignore own messages
    applyRemote(op);
  }, [lastMessage, applyRemote, username]);

  return (
    <div className="editor-container" style={{ height: '100%', width: '100%' }}>
      <div ref={editorRef} style={{ height: '100%' }} />
      {!connected && <div className="connection-status">Reconnecting…</div>}
    </div>
  );
};
