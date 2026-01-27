{"import React from 'react';
import { OperationalTransform } from 'ot-js';

const ConflictResolver = () => {
  const [ot, setOt] = React.useState(new OperationalTransform());
  const [operations, setOperations] = React.useState([]);

  const handleOperation = (operation) => {
    setOperations((prevOperations) => [...prevOperations, operation]);
    setOt((prevOt) => prevOt.apply(operation));
  };

  return (
    <div>
      <h1>Conflict Resolver</h1>
      <button onClick={() => handleOperation({ insert: { at: 0, text: 'Hello' } })}>Insert 'Hello'</button>
      <button onClick={() => handleOperation({ insert: { at: 1, text: ' World' } })}>Insert ' World'</button>
      <button onClick={() => handleOperation({ delete: { at: 0, length: 5 } })}>Delete 'Hello '</button>
    </div>
  );
};

export default ConflictResolver;