import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logoutUser  } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    fechaNacimiento: user?.fechaNacimiento || '',
  });

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

  const handleLogout = () => {
    logoutUser (); // Función de cerrar sesión
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer una llamada a la API para actualizar la información del usuario
    console.log("Datos actualizados:", formData);
    // Después de actualizar, puedes desactivar el modo de edición
    setIsEditing(false);
  };

  if (!user) {
    return <div>Debes iniciar sesión para ver tu perfil.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      <div className="profile-picture"> {/* añadido ultimamente */}
        <img src="https://placehold.co/100x100" alt="Profile Picture" />
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Número de Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleEditToggle}>Cancelar</button>
        </form>
      ) : (
        <div>
          <p>Nombre: {user.nombre}</p>
          <p>Email: {user.email}</p>
          <p>Número de Teléfono: {user.telefono || 'No proporcionado'}</p>
          <p>Fecha de Nacimiento: {user.fechaNacimiento || 'No proporcionada'}</p>
          <button onClick={handleEditToggle}>Editar Información</button>
        </div>
      )}
      <h2>Mis Órdenes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.date} - {order.status} - ${order.total}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;