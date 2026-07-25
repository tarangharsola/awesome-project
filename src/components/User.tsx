{"import React from 'react';
import { useState } from 'react';

function User({ user, onSelect }) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    onSelect(user);
    setSelected(true);
  };

  return (
    <div onClick={handleSelect} style={{ backgroundColor: user.color, padding: '10px', border: '1px solid black' }}>
      {user.name}
    </div>
  );
}

export default User;