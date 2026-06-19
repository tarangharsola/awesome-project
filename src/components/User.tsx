{"import React from 'react';

function User({ user }) {
  return (
    <div>
      <span style={{ color: user.color }}>{user.username}</span>
    </div>
  );
}

export default User;