export const SET_LANGUAGE = 'SET_LANGUAGE' as const;

export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export const setLanguage = (language: string): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

// Export a union type for all editor actions (extend as needed)
export type EditorAction = SetLanguageAction;
