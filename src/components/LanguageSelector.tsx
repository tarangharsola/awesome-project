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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <select value={current} onChange={handleChange} className="language-selector">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
