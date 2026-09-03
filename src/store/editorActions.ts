export const SET_LANGUAGE = 'SET_LANGUAGE';
export const FORMAT_DOCUMENT = 'FORMAT_DOCUMENT';

export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export interface FormatDocumentAction {
  type: typeof FORMAT_DOCUMENT;
}

export const setLanguage = (language: string): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const formatDocument = (): FormatDocumentAction => ({
  type: FORMAT_DOCUMENT,
});

export type EditorActionTypes = SetLanguageAction | FormatDocumentAction;
