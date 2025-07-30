// Modelo de página. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const page = (sequelize, type) => {
    return sequelize.define('pages', {
        // Identificador único de la página (string)
        idPage: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre de la página (string)
        namePage: type.STRING,
        // Descripción de la página (string)
        description: type.STRING,
        // Estado lógico de la página (string)
        statePage: type.STRING,
        // Fecha de creación (string)
        createPage: type.STRING,
        // Fecha de última actualización (string)
        updatePage: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Pagina'
    })
}

module.exports = page;