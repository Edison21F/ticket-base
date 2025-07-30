// Modelo de película. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const movie = (sequelize, type) => {
    return sequelize.define('movies', {
        // Identificador único de la película (string)
        idMovie: {
            type: type.STRING,
            primaryKey: true,
        },
        // Título de la película (string)
        titleMovie: type.STRING,
        // Título original (string)
        originalTitle: type.STRING,
        // Sinopsis (string)
        synopsis: type.STRING,
        // Duración en minutos (string)
        durationMinutes: type.STRING,
        // Fecha de estreno (string)
        releaseDate: type.STRING,
        // Fecha de finalización (string)
        endDate: type.STRING,
        // Idioma original (string)
        originalLanguage: type.STRING,
        // Presupuesto (string)
        budget: type.STRING,
        // Ingresos (string)
        revenue: type.STRING,
        // Distribuidor (string)
        distributor: type.STRING,
        // País de origen (string)
        countryOrigin: type.STRING,
        // Calificación (string)
        ratingMovie: type.STRING,
        // Cantidad de votos (string)
        voteCount: type.STRING,
        // Indicador de popularidad (string)
        popularMovie: type.STRING,
        // Indicador de novedad (string)
        newMovie: type.STRING,
        // Indicador de destacado (string)
        featuredMovie: type.STRING,
        // Estado lógico de la película (string)
        stateMovie: type.STRING,
        // Fecha de creación (string)
        createMovie: type.STRING,
        // Fecha de última actualización (string)
        updateMovie: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Películas'
    })
}

module.exports = movie;