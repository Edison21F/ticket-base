const staff = (sequelize, type) => {
    return sequelize.define('staffs', {
        idStaff: {
            type: type.STRING,
            primaryKey: true,
        },
        nameStaff: type.STRING,
        emailStaff: {
            type: type.STRING,
            unique: true
        },
        phoneStaff: type.STRING,
        positionStaff: type.STRING,
        departmentStaff: type.STRING,
        hireDate: type.STRING,
        salaryStaff: type.STRING,
        workSchedule: type.STRING,
        permissions: type.STRING,
        statusStaff: type.STRING,
        stateStaff: type.STRING,
        createStaff: type.STRING,
        updateStaff: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Personal/Staff'
    })
}

module.exports = staff;