import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ButtonDetails = ({ to, children, ...props }) => {
  return (
    <Button as={Link} to={to} {...props}>
      {children}
    </Button>
  );
};

export default ButtonDetails;
