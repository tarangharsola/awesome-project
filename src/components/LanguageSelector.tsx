import React from 'react';
import { Language } from '../utils/useLanguage';

type Props = {
  language: Language;
  onChange: (lang: Language) => void;
};

/**
 * Simple dropdown allowing the user to pick the editor language.
 * The component is deliberately lightweight – it only emits the selected value.
 */
export const LanguageSelector: React.FC<Props> = ({ language, onChange }) => (
  <select
    value={language}
    onChange={e => onChange(e.target.value as Language)}
    aria-label="Select language"
    style={{ marginBottom: '0.5rem', padding: '0.25rem' }}
  >
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="html">HTML</option>
  </select>
);
