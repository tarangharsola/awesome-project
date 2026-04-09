{"import { User } from './types';

interface UserStateProps {
  username: string;
  color: string;
}

const userState = (username: string, color: string): User => {
  return {
    username,
    color
  };
};

export default userState;