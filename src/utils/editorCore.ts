import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { User } from '../types';

export const useYjsDocument = (roomId: string, user: User) => {
  const ydocRef = useRef<Y.Doc>();
  const providerRef = useRef<WebsocketProvider>();
  const yTextRef = useRef<Y.Text>();

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(`wss://your-domain.com/${roomId}`, roomId, ydoc, {
      // optional params
    });
    const yText = ydoc.getText('monaco');

    ydocRef.current = ydoc;
    providerRef.current = provider;
    yTextRef.current = yText;

    provider.awareness.setLocalStateField('user', user);

    return () => {
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomId, user]);

  return { ydoc: ydocRef.current, provider: providerRef.current, yText: yTextRef.current };
};

export const bindMonacoModel = (
  monacoInstance: typeof editor,
  yText: Y.Text,
  onRemoteChange: (content: string) => void
) => {
  const model = monacoInstance.createModel(yText.toString(), 'javascript');
  const binding = new Y.MonacoBinding(yText, model, new Set([monacoInstance]), provider.awareness);

  const disposable = yText.observe(() => {
    const newContent = yText.toString();
    onRemoteChange(newContent);
  });

  return { model, binding, dispose: () => disposable.unobserve(() => {}), binding };
};