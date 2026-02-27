{"import { useState, useEffect } from 'react';

interface Props {
  documentId: string;
}

const useUsers = ({ documentId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // implement user tracking logic here
  }, []);

  return { users };
}

export default useUsers;