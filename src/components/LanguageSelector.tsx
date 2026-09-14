import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/editorActions';
import { Language } from '../types/editor';
import { RootState } from '../store';

const languages: Language[] = ['javascript', 'python', 'html'];

export const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state: RootState) => state.editor.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    dispatch(setLanguage(lang));
  };

  return (
    <select
      value={currentLang}
      onChange={handleChange}
      className="language-selector"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};