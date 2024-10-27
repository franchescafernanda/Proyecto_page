//Eliminar si esta de mas

import React from 'react';

const MyProfile = () => {
return (
    <div className="profile-container">
    <div className="profile-picture">
        <img src="https://placehold.co/300x300" alt="Profile Picture" />
    </div>
    <div className="profile-info">
    <Form.Group controlId="formName">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder=""
                required
            />
            </Form.Group>
            <br/>
            <Form.Group controlId="formEmail">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=""
                required
            />
            </Form.Group>
            <Form.Group controlId="formPhone">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
                type="number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder=""
                required
            />
            </Form.Group>
            <Form.Group controlId="formAdress">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
                type="text"
                name="adress"
                value={form.adress}
                onChange={handleChange}
                placeholder=""
                required
            />
            </Form.Group>
    </div>
    </div>
);
};

export default MyProfile;