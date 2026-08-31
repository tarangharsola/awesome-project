import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/editorActions';
import { RootState } from '../store';

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as any));
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      aria-label="Language selector"
      style={{ background: 'transparent', color: 'white', border: '1px solid #555', borderRadius: 4, padding: '4px 8px' }}
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
