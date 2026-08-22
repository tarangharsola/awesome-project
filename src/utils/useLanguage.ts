import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const setLanguage = (lang: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };
  return { language, setLanguage };
};