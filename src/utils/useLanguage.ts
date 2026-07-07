{"import { useState, useEffect } from 'react';
import { editorReducer } from '../store/editorReducer';

function useLanguage() {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'languageUpdate') {
        setLanguage(data.language);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return language;
}

export default useLanguage;