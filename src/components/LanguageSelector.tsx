{"import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

function LanguageSelector() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.editor);

  const handleLanguageChange = (language) => {
    dispatch({
      type: 'UPDATE_LANGUAGE',
      payload: language
    });
  };

  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;