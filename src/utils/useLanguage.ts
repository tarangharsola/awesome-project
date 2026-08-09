{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useLanguage = () => {
  const { language, setLanguage } = useWebSocket();
  return { language, setLanguage };
};

export default useLanguage;