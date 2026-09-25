export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = (language: 'javascript' | 'python' | 'html') => ({
  type: SET_LANGUAGE,
  payload: language,
});
