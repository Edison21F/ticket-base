// Modelo de cliente. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const cliente = (sequelize, type) => {
    return sequelize.define('clientes', {
        // Identificador único del cliente (string)
        idClientes: {
            type: type.STRING,
            primaryKey: true,
        },
        // Cédula del cliente (string)
        cedulaCliente: type.STRING,
        // Nombre del cliente (string)
        nombreCliente: type.STRING,
        // Nombre de usuario del cliente (string)
        usernameCliente: type.STRING,
        // Contraseña del cliente (string)
        passwordCliente: type.STRING,
        // Estado lógico del cliente (string)
        stadoCliente: type.STRING,
        // Fecha de creación (string)
        createCliente: type.STRING,
        // Fecha de última actualización (string)
        updateCliente: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla Clientes'
    })
}

module.exports = cliente;