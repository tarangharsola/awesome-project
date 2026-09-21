import React, { useState, useCallback } from 'react';
import { Editor } from './Editor';
import { LanguageSelector } from './LanguageSelector';
import { useWebSocket } from './useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';
import { UserList } from './UserList';

type Language = 'javascript' | 'python' | 'html';

export const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');

  const { sendMessage, connectionStatus } = useWebSocket();

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    sendMessage({ type: 'code-update', payload: newCode });
  }, [sendMessage]);

  const handleSave = useCallback(() => {
    // Example save logic – could be extended to persist to server
    console.log('Document saved');
  }, []);

  const handleFormat = useCallback(() => {
    // Simple formatting: trim trailing spaces
    const formatted = code.split('\n').map(line => line.trimEnd()).join('\n');
    setCode(formatted);
    sendMessage({ type: 'code-update', payload: formatted });
  }, [code, sendMessage]);

  return (
    <div className="app">
      <ConnectionStatus status={connectionStatus} />
      <div className="sidebar">
        <UserList />
        <LanguageSelector language={language} onChange={setLanguage} />
      </div>
      <Editor
        value={code}
        onChange={handleCodeChange}
        language={language}
        onSave={handleSave}
        onFormat={handleFormat}
      />
    </div>
  );
};