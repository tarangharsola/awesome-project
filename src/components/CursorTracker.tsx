{"import React from 'react';
import { styled } from 'styled-components';

const CursorTracker = ({ cursor }) => {
  return (
    <StyledCursor color={cursor.color}>{cursor.name}</StyledCursor>
  );
};

const StyledCursor = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  margin: 2px;
  padding: 4px;
  text-align: center;
`; export default CursorTracker;