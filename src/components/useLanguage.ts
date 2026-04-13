{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useLanguage = () => {
  const [language, setLanguage] = useState('');
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('language', (data) => setLanguage(data));
  }, []);

  return { language, updateLanguage: (language) => send('language', language) };
};

export default useLanguage;