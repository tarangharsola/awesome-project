import React from 'react';
import { useCursor } from './useCursor';
import { useUsers } from './useUsers';

const CursorTracker = () => {
   const cursor = useCursor();
   const users = useUsers();

   return (
      <div>
         {users.map((user, index) => (
            <div key={index}>
               <span style={{ color: user.color }}>{user.name}</span>
               <span> - Cursor position: {cursor.position}</span>
            </div>
         ))}
      </div>
   );
};

export default CursorTracker;