{"import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

interface FormattingDefaultsProps {
  defaults: FormattingDefaults;
  onChange: (defaults: FormattingDefaults) => void;
}

const useFormattingDefaults: React.FC<FormattingDefaultsProps> = ({ defaults, onChange }) => {
  const [localDefaults, setLocalDefaults] = useState(defaults);

  useEffect(() => {
    onChange(localDefaults);
  }, [localDefaults, onChange]);

  const handleTabSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDefaults({ ...localDefaults, tabSize: parseInt(event.target.value, 10) });
  };

  const handleIndentSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDefaults({ ...localDefaults, indentSize: parseInt(event.target.value, 10) });
  };

  return localDefaults;
}

export default useFormattingDefaults;