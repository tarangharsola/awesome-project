{"import React from 'react';
import { styled } from 'styled-components';

const User = ({ name, color }) => {
  return (
    <StyledUser color={color}>{name}</StyledUser>
  );
};

const StyledUser = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  margin: 2px;
  padding: 4px;
  text-align: center;
`; export default User;