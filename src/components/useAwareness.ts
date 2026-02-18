{"import { useState, useEffect } from 'react';

interface AwarenessProps {
  username: string;
  users: string[];
}

const useAwareness = ({ username, users }: AwarenessProps) => {
  const [presence, setPresence] = useState({ [username]: true });

  useEffect(() => {
    setPresence((prevPresence) => ({ ...prevPresence, ...users.reduce((acc, user) => ({ ...acc, [user]: true }), {}) }));
  }, [users]);

  return presence;
}

export default useAwareness;