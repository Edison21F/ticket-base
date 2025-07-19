// Modelo de producto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const product = (sequelize, type) => {
    return sequelize.define('products', {
        // Identificador único del producto (string)
        idProduct: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del producto (string)
        nameProduct: type.STRING,
        // Descripción del producto (string)
        descriptionProduct: type.STRING,
        // Precio del producto (string)
        priceProduct: type.STRING,
        // Ingredientes del producto (string)
        ingredients: type.STRING,
        // Alérgenos del producto (string)
        allergens: type.STRING,
        // Disponibilidad del producto (string)
        availableProduct: type.STRING,
        // Stock del producto (string)
        stockProduct: type.STRING,
        // Indicador de popularidad (string)
        popularProduct: type.STRING,
        // Indicador de novedad (string)
        newProduct: type.STRING,
        // Porcentaje de descuento (string)
        discountPercentage: type.STRING,
        // Fecha de inicio de descuento (string)
        discountStartDate: type.STRING,
        // Fecha de fin de descuento (string)
        discountEndDate: type.STRING,
        // Calificación del producto (string)
        ratingProduct: type.STRING,
        // Cantidad de votos (string)
        voteCount: type.STRING,
        // Estado lógico del producto (string)
        stateProduct: type.STRING,
        // Fecha de creación (string)
        createProduct: type.STRING,
        // Fecha de última actualización (string)
        updateProduct: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Productos'
    })
}

module.exports = product;