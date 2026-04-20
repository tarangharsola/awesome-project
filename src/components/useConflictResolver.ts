{"import { useState, useEffect } from 'react';
import { OT } from 'operational-transform';

interface ConflictResolverProps {
  user: string;
  text: string;
  cursor: number;
}

const useConflictResolver = (props: ConflictResolverProps) => {
  const [text, setText] = useState(props.text);
  const [cursor, setCursor] = useState(props.cursor);

  useEffect(() => {
    const ot = new OT(props.text);
    const transformedText = ot.apply(props.user, props.text);
    setText(transformedText);
  }, [props.text, props.user]);

  useEffect(() => {
    const ot = new OT(props.text);
    const transformedCursor = ot.applyCursor(props.user, props.cursor);
    setCursor(transformedCursor);
  }, [props.text, props.user, props.cursor]);

  return { text, cursor };
};

export default useConflictResolver;