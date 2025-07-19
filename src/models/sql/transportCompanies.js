// Modelo de empresa de transporte. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const transportCompany = (sequelize, type) => {
    return sequelize.define('transportCompanies', {
        // Identificador único de la empresa de transporte (string)
        idTransportCompany: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre de la empresa (string)
        nameCompany: type.STRING,
        // Número de licencia de operación (string)
        licenseNumber: type.STRING,
        // Correo de contacto (string)
        contactEmail: type.STRING,
        // Teléfono de contacto (string)
        contactPhone: type.STRING,
        // Dirección de la empresa (string)
        addressCompany: type.STRING,
        // Sitio web de la empresa (string)
        websiteCompany: type.STRING,
        // Calificación de la empresa (string)
        ratingCompany: type.STRING,
        // Estado de la empresa (string)
        statusCompany: type.STRING,
        // Estado lógico de la empresa (string)
        stateCompany: type.STRING,
        // Fecha de creación (string)
        createCompany: type.STRING,
        // Fecha de última actualización (string)
        updateCompany: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Empresas de Transporte'
    })
}

module.exports = transportCompany;