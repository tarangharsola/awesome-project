// src/components/LanguageSelector.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/editorActions';
import { EditorState } from '../store/editorReducer';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector< { editor: EditorState }, string>((state) => state.editor.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    dispatch(setLanguage(newLang));
  };

  return (
    <select value={currentLanguage} onChange={handleChange} className="language-selector">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
