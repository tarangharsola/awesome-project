import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLanguage as setLanguageAction } from '../store/editorReducer';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);

  const setLanguage = useCallback(
    (lang: string) => {
      dispatch(setLanguageAction(lang as any));
    },
    [dispatch]
  );

  return { language, setLanguage };
};