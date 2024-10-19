
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ButtonProducts = ({ to, children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return <button className="btn btn-danger btn-lg" onClick={handleClick}>{children}</button>;
};

export default ButtonProducts;
