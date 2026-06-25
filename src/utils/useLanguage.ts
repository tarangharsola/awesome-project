{"import { useState, useEffect } from 'react';
import { languages } from 'codemirror';

function useLanguage() {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'language') {
        setLanguage(data.language);
      }
    };
    return () => ws.close();
  }, []);

  return language;
}

export default useLanguage;