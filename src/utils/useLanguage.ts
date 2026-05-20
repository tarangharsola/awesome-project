{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('languageUpdate', (data) => {
      setLanguage(data);
    });
  }, []);

  return { language };
};

export default useLanguage;