{"import { useStore } from 'react-redux';
import { UserState } from './userReducerTypes';

const useUsers = () => {
  const store = useStore();
  const userState = store.getState().userState;
  return userState;
};

export default useUsers;