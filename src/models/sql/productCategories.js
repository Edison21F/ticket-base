// Modelo de categoría de producto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const productCategory = (sequelize, type) => {
    return sequelize.define('productCategories', {
        // Identificador único de la categoría (string)
        idProductCategory: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre de la categoría (string)
        nameCategory: {
            type: type.STRING,
            unique: true
        },
        // Descripción de la categoría (string)
        descriptionCategory: type.STRING,
        // Ícono de la categoría (string)
        iconCategory: type.STRING,
        // Orden de despliegue (string)
        displayOrder: type.STRING,
        // Estado lógico de la categoría (string)
        stateCategory: type.STRING,
        // Fecha de creación (string)
        createCategory: type.STRING,
        // Fecha de última actualización (string)
        updateCategory: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Categorías de Productos'
    })
}

module.exports = productCategory;