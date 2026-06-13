import { Action } from 'redux';

interface UserState {
   user: string;
}

const initialState: UserState = {
   user: '',
};

const user = (state = initialState, action: Action) => {
   switch (action.type) {
      case 'UPDATE':
         return { ...state, user: action.payload };
      default:
         return state;
   }
};

export { user, initialState };