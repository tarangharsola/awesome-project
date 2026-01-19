{"import React from 'react';
import { Editor } from 'react-simple-editor';
import { useEditor } from './useEditor';

const EditorComponent = () => {
  const { language, onChange, value } = useEditor();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleFormat = () => {
    const formattedText = formatText(value);
    onChange(formattedText);
  };

  const handleShortcut = (event) => {
    if (event.key === 'f') {
      handleFormat();
    }
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <Editor
        value={value}
        onChange={onChange}
        onShortcut={handleShortcut}
      />
    </div>
  );
};

export default EditorComponent;