import { AuthContext } from "../context/AuthContext";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import LogoNavbar from "../assets/img/";
import UserDropdown from "../components/UserDropdown";
import { useContext } from "react";
//import logout_icon from "../src/assets/img/logout_24.png"
import "./navbar.css"




function NavbarPlantiv() {
  const { user, logoutUser  } = useContext(AuthContext);
  const handleLogout = () => {
    logoutUser (); // Función de cerrar sesión
  };


  
  return (
    <>
      <Navbar className="Navbar">
        {/* <div>
          <img src={LogoNavbar} height={80} alt="" /> no encuentro el logo
        </div> */}
        
        <Container className="containerNavbar">
          <NavbarBrand to="/"></NavbarBrand>
          <Nav className="nav">
            <NavLink className="navlinkNavbar" to="/">
              Home
            </NavLink>
            <NavLink className="navlinkNavbar" to="/register">
              Crear cuenta
            </NavLink>
            <NavLink className="navlinkNavbar" to="/login">
              Iniciar sesión
            </NavLink>
            <NavLink className="navlinkNavbar" to="/products">
              Productos
            </NavLink>
            <NavLink className="navlinkNavbar" to="/cart">
              Carrito
            </NavLink>
            <UserDropdown />
            <p
              onClick={handleLogout} className="salir"
            >Salir</p>
            {/* <img src={logout_icon} alt="logout_icon" /> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarPlantiv;
