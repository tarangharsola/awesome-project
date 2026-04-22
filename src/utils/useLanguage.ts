import { useState } from 'react';
import { Language } from '../types';

const useLanguage = () => {
   const [language, setLanguage] = useState<Language>('javascript');

   return { language, setLanguage };
};

export default useLanguage;