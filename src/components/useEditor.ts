{"import React from 'react';
import { useLanguage } from './useLanguage';

const Editor = () => {
  const language = useLanguage();
  const [code, setCode] = React.useState('');
  const [formattedCode, setFormattedCode] = React.useState('');

  React.useEffect(() => {
    const handleLanguageChange = () => {
      setFormattedCode(highlightCode(code, language));
    };
    handleLanguageChange();
    return () => {
      handleLanguageChange();
    };
  }, [code, language]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleFormatCode = () => {
    setFormattedCode(highlightCode(code, language));
  };

  return (
    <div>
      <textarea value={code} onChange={handleCodeChange} />
      <button onClick={handleFormatCode}>Format</button>
      <pre>{formattedCode}</pre>
    </div>
  );
};

export default Editor;