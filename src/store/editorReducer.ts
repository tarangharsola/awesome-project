import { UPDATE_CONTENT, SET_USERS, SET_LANGUAGE } from '../store/actionTypes';

const initialState = {
  content: '',
  users: [],
  language: 'javascript', // default language
};

export default function editorReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
