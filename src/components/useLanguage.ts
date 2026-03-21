{"import { useState } from 'react';

interface Language {
  name: string;
  formatCode: (code: string) => string;
}

const languages: Language[] = [
  {
    name: 'JavaScript',
    formatCode: (code) => code.replace(/console.log/g, '// console.log'),
  },
  {
    name: 'Python',
    formatCode: (code) => code.replace(/print/g, '// print'),
  },
  {
    name: 'HTML',
    formatCode: (code) => code.replace(/<script>/g, '// <script>'),
  },
];

const useLanguage = (language: string) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const formatCode = (code: string) => {
    const languageFormat = languages.find((lang) => lang.name === selectedLanguage);
    return languageFormat ? languageFormat.formatCode(code) : code;
  };

  return { formatCode };
};

export default useLanguage;