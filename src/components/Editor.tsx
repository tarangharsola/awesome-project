{"import React from 'react';
import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'react-simple-editor';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const selection = editorState.getSelection();
        const start = selection.getStartKey();
        const end = selection.getEndKey();
        const text = editorState.getCurrentContent().getPlainText();
        const lines = text.split('\n');
        const startLine = lines[start].split(' ').length;
        const endLine = lines[end].split(' ').length;
        const indent = lines[start].match(/^\s*/)[0].length;
        const newLines = lines.slice(0, start).concat([' '.repeat(indent) + ' '.repeat(endLine - startLine)].concat(lines.slice(start + 1)));
        const newContent = editorState.getCurrentContent().merge({
          text: newLines.join('\n'),
        });
        setEditorState(EditorState.push(editorState, newContent, 'insert-text'));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <select value={fontSize} onChange={handleFontSizeChange}>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
      </select>
      <EditorState
        editorState={editorState}
        onEditorStateChange={setEditorState}
        language={language}
        fontSize={fontSize}
      />
    </div>
  );
};

export default EditorComponent;