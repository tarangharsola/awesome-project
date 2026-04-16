{"import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function useUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch({ type: 'UPDATE_USERS', payload: users });
  }, [users]);

  return { users };
}

export default useUsers;