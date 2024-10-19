import React from "react";
import ButtonProducts from "../components/ButtonProducts.jsx";
import CRapida from "../assets/img/stickers/icons8-shopping-cart.png"
import ESeguro from "../assets/img/stickers/icons8-enviado.png"
import SProtegido from "../assets/img/stickers/icons8-seguridad-comprobado.png"
import Garantia from "../assets/img/stickers/icons8-garantia.png"


const Home = () => {
  return (
    <div className="home">
      <div className="homeImg">
      </div>
      <br />
        <div className="novedades">
          <img className="photo1" src="https://i.pinimg.com/474x/df/08/6d/df086d35d8cf9fd9ac54265b19017125.jpg" alt="zapatilla" />
          <img className="photo1" src="data:image/jpeg;base64,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" alt="palazo" />
          <img className="photo1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY_XsTv6c5LQZ7X5PBFn4z6Es-jtHOesd8Qw&s" alt="tacon" />
          <img className="photo1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8vAIpBzZ39c1aDfS0allNkuQgyaZlJKF0ELl6Hz3rSUPHB9IuyRF-ZyJR_aw44kR-6s&usqp=CAU" alt="vestido" />
        </div>
      <br />
      <ButtonProducts className="buttonProducts" to="/products">
        Ver Productos
      </ButtonProducts>
      <div className="category">
        <div className="subcategory">
          <img src={CRapida} alt="" /> 
            <p>Compra rápida</p>
        </div>
      <div className="subcategory">
          <img src={ESeguro} width={50} alt="" /> 
            <p>Envío seguro</p>
      </div>  
        
      <div className="subcategory">
        <img src={SProtegido} alt="" /> 
          <p>Sitio protegido</p>
      </div> 

      <div className="subcategory">
        <img src={Garantia} alt="" /> 
          <p>Garantía</p>
      </div>
      </div>
    </div>
    
  );
};

export default Home;
