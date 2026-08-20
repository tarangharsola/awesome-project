import React from 'react';
import useLanguage from '../utils/useLanguage';
import styles from '../styles/user.module.css';

const LanguageSelector = () => {
  const { language, changeLanguage, supportedLanguages } = useLanguage();

  return (
    <select
      className={styles.selector}
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {supportedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
