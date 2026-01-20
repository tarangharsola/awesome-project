{"import React from 'react';
import { AwarenessConsistency } from 'react-awareness-consistency';

interface AwarenessConsistencyProps {
  users: any[];
  onPresenceChange: (presence: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ users, onPresenceChange }) => {
  const [presence, setPresence] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newPresence = {
        ...presence,
        ...users.reduce((acc, user) => ({
          ...acc,
          [user.id]: user.presence,
        }), {})
      };
      setPresence(newPresence);
      onPresenceChange(newPresence);
    }, 1000);
    return () => clearInterval(interval);
  }, [users, onPresenceChange]);

  return null;
};

export default AwarenessConsistency;