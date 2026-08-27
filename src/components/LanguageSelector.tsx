import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/editorReducer';
import { RootState } from '../store';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.editor.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select" style={{ marginRight: '8px' }}>
        Language:
      </label>
      <select id="language-select" value={currentLanguage} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;