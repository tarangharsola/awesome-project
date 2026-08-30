import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLanguage } from '../store/editorActions';
import { Language } from '../types/editor';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  return { language, changeLanguage };
};
