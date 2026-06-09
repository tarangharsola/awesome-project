{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  languages: string[]
}

const useLanguage = ({ languages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { connection } = useWebSocket();

  useEffect(() => {
    if (connection) {
      connection.onmessage = (event) => {
        const { language } = JSON.parse(event.data);
        setSelectedLanguage(language);
      };
    }
  }, [connection]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return { selectedLanguage, handleLanguageChange };
}

export default useLanguage;