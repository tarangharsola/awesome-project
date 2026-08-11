{"import { useState } from 'react';

interface Props {
  language: string;
}

const useFormattingDefaults = (props: Props) => {
  const [tabSize, setTabSize] = useState(2);
  const [indentSize, setIndentSize] = useState(2);

  const handleTabSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabSize(parseInt(event.target.value, 10));
  };

  const handleIndentSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndentSize(parseInt(event.target.value, 10));
  };

  return {
    tabSize,
    indentSize,
    handleTabSizeChange,
    handleIndentSizeChange
  };

  return useFormattingDefaults;
}

export default useFormattingDefaults;