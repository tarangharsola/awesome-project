{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('language', (language) => {
      setLanguage(language);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return language;
};

export default useLanguage;