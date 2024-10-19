//Agregado nuevo
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserDropdown = () => {
  return (
    <Dropdown>
      <DropdownToggle variant="danger" id="dropdown-basic">
        Mi Cuenta
      </DropdownToggle>

      <DropdownMenu>
        <LinkContainer to="/profile">
          <DropdownItem>Mi Perfil</DropdownItem>
        </LinkContainer>
        <LinkContainer to="/orders">
          <DropdownItem>Mis Ordenes</DropdownItem>
        </LinkContainer>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;