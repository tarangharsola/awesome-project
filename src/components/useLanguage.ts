{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface LanguageState {
  language: string;
}

const useLanguage = () => {
  const [languageState, setLanguageState] = useState<LanguageState>({ language: '' });
  const socket = io();

  useEffect(() => {
    socket.on('language', (language: string) => {
      setLanguageState({ language });
    });
  }, []);

  return languageState;
};

export default useLanguage;