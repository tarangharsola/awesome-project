// Import required modules
import { useState, useEffect } from 'react';

// Define the useUsers hook
const useUsers = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // Update users list on changes
    const handleChanges = () => {
      setUsersList(['User 1', 'User 2']);
    };
    return () => {
      // Clean up on unmount
      handleChanges();
    };
  }, []);

  return { usersList, setUsersList };
};

export default useUsers;