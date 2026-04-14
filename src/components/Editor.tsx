{"import React from 'react';
import { useState } from 'react';
import { useEditor } from './useEditor';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleFormat = () => {
    const formattedValue = formatCode(value);
    setFormattedValue(formattedValue);
    onChange(formattedValue);
  };

  return (
    <div>
      <textarea value={formattedValue} onChange={(e) => onChange(e.target.value)} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return Editor;
}
export default Editor;