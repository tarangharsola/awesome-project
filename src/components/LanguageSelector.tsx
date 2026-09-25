import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/editorActions';
import { AppState } from '../store';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const current = useSelector((state: AppState) => state.editor.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelect>
) => {
    const lang = e.target.value as 'javascript' | 'python' | 'html';
    dispatch(setLanguage(lang));
  };

  return (
    <select className="language-selector" value={current} onChange={handleChange}>
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
