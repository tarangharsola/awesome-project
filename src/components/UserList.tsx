{"import React from 'react';
import { List, ListItem } from 'material-ui';

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <span style={{ color: user.color }}>{user.name}</span>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;