const staffAssignment = (sequelize, type) => {
    return sequelize.define('staffAssignments', {
        idStaffAssignment: {
            type: type.STRING,
            primaryKey: true,
        },
        assignmentType: type.STRING,
        assignmentDate: type.STRING,
        startTime: type.STRING,
        endTime: type.STRING,
        locationAssignment: type.STRING,
        responsibilitiesAssignment: type.STRING,
        statusAssignment: type.STRING,
        stateAssignment: type.STRING,
        createAssignment: type.STRING,
        updateAssignment: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Asignaciones de Personal'
    })
}

module.exports = staffAssignment;