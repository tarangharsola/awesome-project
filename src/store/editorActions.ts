export const SET_CONTENT = 'SET_CONTENT';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export interface SetContentAction {
  type: typeof SET_CONTENT;
  payload: string;
}

export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export const setContent = (content: string): SetContentAction => ({
  type: SET_CONTENT,
  payload: content,
});

export const setLanguage = (language: string): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});