import type { UsersState, UsersAction, UserPresence } from '../types';

export const initialUsersState: UsersState = {
  users: {},
  lastSeen: {},
};

const STALE_TIMEOUT = 30_000; // 30 seconds

export default function usersReducer(state = initialUsersState, action: UsersAction): UsersState {
  const now = Date.now();
  switch (action.type) {
    case 'USER_JOIN': {
      const { userId, presence } = action.payload;
      return {
        ...state,
        users: { ...state.users, [userId]: presence },
        lastSeen: { ...state.lastSeen, [userId]: now },
      };
    }
    case 'USER_LEAVE': {
      const { userId } = action.payload;
      const { [userId]: _, ...remaining } = state.users;
      const { [userId]: __, ...remainingSeen } = state.lastSeen;
      return { ...state, users: remaining, lastSeen: remainingSeen };
    }
    case 'UPDATE_AWARENESS': {
      const { userId, presence } = action.payload;
      return {
        ...state,
        users: { ...state.users, [userId]: presence },
        lastSeen: { ...state.lastSeen, [userId]: now },
      };
    }
    case 'CLEANUP_STALE_USERS': {
      const freshUsers: Record<string, UserPresence> = {};
      const freshSeen: Record<string, number> = {};
      Object.entries(state.lastSeen).forEach(([id, timestamp]) => {
        if (now - timestamp < STALE_TIMEOUT) {
          freshUsers[id] = state.users[id];
          freshSeen[id] = timestamp;
        }
      });
      return { users: freshUsers, lastSeen: freshSeen };
    }
    default:
      return state;
  }
}
