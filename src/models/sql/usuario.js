const usuario = (sequelize, type) =>{
    return sequelize.define('users', {
        idUser: {
            type: type.STRING,
            primaryKey: true,
        },
        nameUsers: type.STRING,
        phoneUser: type.STRING,
        emailUser: type.STRING,
        passwordUser: type.STRING,
        userName: type.STRING,
        stateUser: type.STRING,
        createUser: type.STRING,
        updateUser: type.STRING,
    }, {
        timestamps: false,
        Comment: 'Tabla de Usuarios'
    })
}

module.exports = usuario;