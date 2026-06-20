{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
  document: string;
}

const useEditor = ({ language, document }: Props) => {
  const [value, setValue] = useState(document);
  const { send } = useWebSocket();

  useEffect(() => {
    send({ type: 'update', data: value });
  }, [value]);

  return [value, setValue];
};

export default useEditor;