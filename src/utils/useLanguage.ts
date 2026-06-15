{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  language: string;
}

const useLanguage = ({ language }: Props) => {
  const { sendLanguage } = useWebSocket();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    sendLanguage(language);
  }, [language]);

  return { currentLanguage, language, sendLanguage };
};

export default useLanguage;