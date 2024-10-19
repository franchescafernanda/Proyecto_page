//Agregado nuevo
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Aquí podrías hacer una llamada a la API para obtener las órdenes del usuario
      // Por ahora, usar datos falsos:
      setOrders([
        { id: 1, date: "2023-07-01", status: "Pendiente", total: 50 },
        { id: 2, date: "2023-07-05", status: "Completada", total: 30 },
      ]);
    }
  }, [user]);

  if (!user) {
    return <div>Debes iniciar sesión para ver tu perfil.</div>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      <h2>Mis Órdenes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.date} - {order.status} - ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;