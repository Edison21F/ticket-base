const transportCtl = {};
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

// Función para descifrar de forma segura
const descifrarSeguro = (dato) => {
    try {
        return dato ? descifrarDatos(dato) : '';
    } catch (error) {
        console.error('Error al descifrar:', error);
        return '';
    }
};

// ================ GESTIÓN DE EMPRESAS DE TRANSPORTE ================

// Mostrar todas las empresas de transporte activas
transportCtl.mostrarEmpresas = async (req, res) => {
    try {
        const [empresas] = await sql.promise().query(`
            SELECT tc.*, 
                   COUNT(DISTINCT tr.idTransportRoute) as rutasActivas,
                   COUNT(DISTINCT tv.idTransportVehicle) as vehiculosActivos,
                   COUNT(DISTINCT tres.idTransportReservation) as reservasTotales,
                   AVG(tc.ratingCompany) as promedioRating
            FROM transportCompanies tc
            LEFT JOIN transportRoutes tr ON tc.idTransportCompany = tr.companyId AND tr.stateRoute = 1
            LEFT JOIN transportVehicles tv ON tc.idTransportCompany = tv.companyId AND tv.stateVehicle = 1
            LEFT JOIN transportReservations tres ON tv.idTransportVehicle = tres.vehicleId
            WHERE tc.stateCompany = 1
            GROUP BY tc.idTransportCompany
            ORDER BY tc.statusCompany DESC, tc.ratingCompany DESC
        `);

        const empresasCompletas = empresas.map(empresa => ({
            ...empresa,
            nameCompany: descifrarSeguro(empresa.nameCompany),
            contactEmail: descifrarSeguro(empresa.contactEmail),
            contactPhone: descifrarSeguro(empresa.contactPhone),
            addressCompany: descifrarSeguro(empresa.addressCompany),
            websiteCompany: descifrarSeguro(empresa.websiteCompany),
            rutasActivas: empresa.rutasActivas || 0,
            vehiculosActivos: empresa.vehiculosActivos || 0,
            reservasTotales: empresa.reservasTotales || 0
        }));

        return res.json(empresasCompletas);
    } catch (error) {
        console.error('Error al mostrar empresas:', error);
        return res.status(500).json({ message: 'Error al obtener empresas', error: error.message });
    }
};

// Crear nueva empresa de transporte
transportCtl.crearEmpresa = async (req, res) => {
    try {
        const { 
            nameCompany, licenseNumber, contactEmail, contactPhone,
            addressCompany, websiteCompany, statusCompany
        } = req.body;

        // Validaciones
        if (!nameCompany || !licenseNumber || !contactEmail) {
            return res.status(400).json({ message: 'Nombre, número de licencia y email son obligatorios' });
        }

        // Verificar si ya existe una empresa con el mismo número de licencia
        const [empresaExiste] = await sql.promise().query(
            'SELECT idTransportCompany FROM transportCompanies WHERE licenseNumber = ? AND stateCompany = 1',
            [licenseNumber]
        );

        if (empresaExiste.length > 0) {
            return res.status(400).json({ message: 'Ya existe una empresa con este número de licencia' });
        }

        // Crear empresa
        const nuevaEmpresa = await orm.TransportCompany.create({
            nameCompany: cifrarDatos(nameCompany),
            licenseNumber: licenseNumber,
            contactEmail: cifrarDatos(contactEmail),
            contactPhone: cifrarDatos(contactPhone || ''),
            addressCompany: cifrarDatos(addressCompany || ''),
            websiteCompany: cifrarDatos(websiteCompany || ''),
            ratingCompany: 0.0,
            statusCompany: statusCompany || 'active',
            stateCompany: true,
            createCompany: new Date().toLocaleString(),
        });

        return res.status(201).json({ 
            message: 'Empresa de transporte creada exitosamente',
            idCompany: nuevaEmpresa.idTransportCompany
        });

    } catch (error) {
        console.error('Error al crear empresa:', error);
        return res.status(500).json({ 
            message: 'Error al crear la empresa', 
            error: error.message 
        });
    }
};

// ================ GESTIÓN DE RUTAS ================

// Mostrar todas las rutas activas
transportCtl.mostrarRutas = async (req, res) => {
    try {
        const [rutas] = await sql.promise().query(`
            SELECT tr.*, tc.nameCompany,
                   COUNT(DISTINCT tv.idTransportVehicle) as vehiculosAsignados,
                   COUNT(DISTINCT ts.idTransportSchedule) as horariosActivos
            FROM transportRoutes tr
            JOIN transportCompanies tc ON tr.companyId = tc.idTransportCompany
            LEFT JOIN transportVehicles tv ON tr.idTransportRoute = tv.routeId AND tv.stateVehicle = 1
            LEFT JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId AND ts.stateSchedule = 1
            WHERE tr.stateRoute = 1 AND tc.stateCompany = 1
            GROUP BY tr.idTransportRoute
            ORDER BY tr.transportType ASC, tr.routeName ASC
        `);

        const rutasCompletas = await Promise.all(
            rutas.map(async (ruta) => {
                // Obtener metadata de MongoDB
                const metadata = await mongo.transportMetadataModel.findOne({
                    idTransportSql: ruta.idTransportRoute.toString()
                });

                return {
                    ...ruta,
                    routeName: descifrarSeguro(ruta.routeName),
                    origin: descifrarSeguro(ruta.origin),
                    destination: descifrarSeguro(ruta.destination),
                    nameCompany: descifrarSeguro(ruta.nameCompany),
                    vehiculosAsignados: ruta.vehiculosAsignados || 0,
                    horariosActivos: ruta.horariosActivos || 0,
                    metadata: metadata ? {
                        coordenadas: metadata.routeDetails?.gpsCoordinates,
                        patronesTrafico: metadata.routeDetails?.trafficPatterns,
                        impactoClima: metadata.routeDetails?.weatherImpact
                    } : null
                };
            })
        );

        return res.json(rutasCompletas);
    } catch (error) {
        console.error('Error al mostrar rutas:', error);
        return res.status(500).json({ message: 'Error al obtener rutas', error: error.message });
    }
};

// Crear nueva ruta
transportCtl.crearRuta = async (req, res) => {
    try {
        const { 
            routeName, transportType, origin, destination, companyId,
            distanceKm, estimatedDuration, routeCode, waypoints, tollCosts,
            // Metadata adicional
            gpsCoordinates, trafficPatterns, weatherImpact
        } = req.body;

        // Validaciones
        if (!routeName || !transportType || !origin || !destination || !companyId) {
            return res.status(400).json({ message: 'Nombre, tipo, origen, destino y empresa son obligatorios' });
        }

        // Verificar que la empresa existe
        const [empresaExiste] = await sql.promise().query(
            'SELECT idTransportCompany FROM transportCompanies WHERE idTransportCompany = ? AND stateCompany = 1',
            [companyId]
        );

        if (empresaExiste.length === 0) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Crear ruta
        const nuevaRuta = await orm.TransportRoute.create({
            routeName: cifrarDatos(routeName),
            transportType: transportType,
            origin: cifrarDatos(origin),
            destination: cifrarDatos(destination),
            companyId: parseInt(companyId),
            distanceKm: parseFloat(distanceKm) || 0,
            estimatedDuration: parseInt(estimatedDuration) || 0,
            routeCode: routeCode || '',
            waypoints: waypoints || '',
            tollCosts: parseFloat(tollCosts) || 0,
            statusRoute: 'active',
            stateRoute: true,
            createRoute: new Date().toLocaleString(),
        });

        // Crear metadata en MongoDB
        if (gpsCoordinates || trafficPatterns || weatherImpact) {
            await mongo.transportMetadataModel.create({
                routeDetails: {
                    gpsCoordinates: gpsCoordinates || [],
                    trafficPatterns: trafficPatterns || [],
                    weatherImpact: weatherImpact || {}
                },
                vehicleFeatures: {},
                serviceLevel: {},
                realTimeTracking: {},
                operationalNotes: {},
                idTransportSql: nuevaRuta.idTransportRoute.toString()
            });
        }

        return res.status(201).json({ 
            message: 'Ruta creada exitosamente',
            idRoute: nuevaRuta.idTransportRoute
        });

    } catch (error) {
        console.error('Error al crear ruta:', error);
        return res.status(500).json({ 
            message: 'Error al crear la ruta', 
            error: error.message 
        });
    }
};

// ================ GESTIÓN DE VEHÍCULOS ================

// Obtener vehículos de una empresa específica
transportCtl.obtenerVehiculosEmpresa = async (req, res) => {
    try {
        const { companyId } = req.params;

        const [vehiculos] = await sql.promise().query(`
            SELECT tv.*, tr.routeName, tr.origin, tr.destination,
                   COUNT(DISTINCT ts.idTransportSchedule) as horariosActivos,
                   COUNT(DISTINCT tres.idTransportReservation) as reservasTotales
            FROM transportVehicles tv
            LEFT JOIN transportRoutes tr ON tv.routeId = tr.idTransportRoute
            LEFT JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId AND ts.stateSchedule = 1
            LEFT JOIN transportReservations tres ON ts.idTransportSchedule = tres.scheduleId
            WHERE tv.companyId = ? AND tv.stateVehicle = 1
            GROUP BY tv.idTransportVehicle
            ORDER BY tv.transportType ASC, tv.vehicleCode ASC
        `, [companyId]);

        const vehiculosCompletos = await Promise.all(
            vehiculos.map(async (vehiculo) => {
                // Obtener características del vehículo de MongoDB
                const metadata = await mongo.transportMetadataModel.findOne({
                    idTransportSql: vehiculo.idTransportVehicle.toString()
                });

                return {
                    ...vehiculo,
                    routeName: descifrarSeguro(vehiculo.routeName),
                    origin: descifrarSeguro(vehiculo.origin),
                    destination: descifrarSeguro(vehiculo.destination),
                    horariosActivos: vehiculo.horariosActivos || 0,
                    reservasTotales: vehiculo.reservasTotales || 0,
                    caracteristicas: metadata?.vehicleFeatures || null
                };
            })
        );

        return res.json(vehiculosCompletos);
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        return res.status(500).json({ message: 'Error al obtener vehículos', error: error.message });
    }
};

// Crear nuevo vehículo
transportCtl.crearVehiculo = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { 
            vehicleCode, transportType, capacity, vehicleModel,
            licensePlate, yearVehicle, fuelType, routeId,
            facilities, safetyFeatures, statusVehicle,
            // Características adicionales
            wifi, airConditioning, entertainment, accessibility, safety
        } = req.body;

        // Validaciones
        if (!vehicleCode || !transportType || !capacity || !vehicleModel) {
            return res.status(400).json({ message: 'Código, tipo, capacidad y modelo son obligatorios' });
        }

        // Verificar que la empresa existe
        const [empresaExiste] = await sql.promise().query(
            'SELECT idTransportCompany FROM transportCompanies WHERE idTransportCompany = ? AND stateCompany = 1',
            [companyId]
        );

        if (empresaExiste.length === 0) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Crear vehículo
        const nuevoVehiculo = await orm.TransportVehicle.create({
            vehicleCode: vehicleCode,
            transportType: transportType,
            capacity: parseInt(capacity),
            vehicleModel: vehicleModel,
            licensePlate: licensePlate || '',
            yearVehicle: parseInt(yearVehicle) || new Date().getFullYear(),
            fuelType: fuelType || 'gasoline',
            companyId: parseInt(companyId),
            routeId: routeId ? parseInt(routeId) : null,
            facilities: facilities || '',
            safetyFeatures: safetyFeatures || '',
            lastMaintenance: new Date(),
            nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
            statusVehicle: statusVehicle || 'active',
            stateVehicle: true,
            createVehicle: new Date().toLocaleString(),
        });

        // Crear características en MongoDB
        if (wifi || airConditioning || entertainment || accessibility || safety) {
            await mongo.transportMetadataModel.create({
                routeDetails: {},
                vehicleFeatures: {
                    wifi: wifi || false,
                    airConditioning: airConditioning || false,
                    entertainment: entertainment || [],
                    accessibility: accessibility || {},
                    safety: safety || {}
                },
                serviceLevel: {},
                realTimeTracking: {},
                operationalNotes: {},
                idTransportSql: nuevoVehiculo.idTransportVehicle.toString()
            });
        }

        return res.status(201).json({ 
            message: 'Vehículo creado exitosamente',
            idVehicle: nuevoVehiculo.idTransportVehicle
        });

    } catch (error) {
        console.error('Error al crear vehículo:', error);
        return res.status(500).json({ 
            message: 'Error al crear el vehículo', 
            error: error.message 
        });
    }
};

// ================ GESTIÓN DE HORARIOS ================

// Obtener horarios de un vehículo específico
transportCtl.obtenerHorariosVehiculo = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        const [horarios] = await sql.promise().query(`
            SELECT ts.*, tv.vehicleCode, tr.routeName, tr.origin, tr.destination,
                   COUNT(DISTINCT tres.idTransportReservation) as reservasActivas,
                   SUM(tres.priceReservation) as ingresoTotal
            FROM transportSchedules ts
            JOIN transportVehicles tv ON ts.vehicleId = tv.idTransportVehicle
            JOIN transportRoutes tr ON tv.routeId = tr.idTransportRoute
            LEFT JOIN transportReservations tres ON ts.idTransportSchedule = tres.scheduleId
            WHERE ts.vehicleId = ? AND ts.stateSchedule = 1
            GROUP BY ts.idTransportSchedule
            ORDER BY ts.departureTime ASC
        `, [vehicleId]);

        const horariosCompletos = horarios.map(horario => ({
            ...horario,
            routeName: descifrarSeguro(horario.routeName),
            origin: descifrarSeguro(horario.origin),
            destination: descifrarSeguro(horario.destination),
            reservasActivas: horario.reservasActivas || 0,
            ingresoTotal: horario.ingresoTotal || 0,
            asientosDisponibles: horario.availableSeats || 0
        }));

        return res.json(horariosCompletos);
    } catch (error) {
        console.error('Error al obtener horarios:', error);
        return res.status(500).json({ message: 'Error al obtener horarios', error: error.message });
    }
};

// Crear nuevo horario
transportCtl.crearHorario = async (req, res) => {
    try {
        const { 
            vehicleId, routeId, departureTime, arrivalTime, priceSchedule,
            availableSeats, gateTerminal, platform
        } = req.body;

        // Validaciones
        if (!vehicleId || !routeId || !departureTime || !arrivalTime || !priceSchedule) {
            return res.status(400).json({ message: 'Vehículo, ruta, horarios y precio son obligatorios' });
        }

        // Verificar que el vehículo existe
        const [vehiculoExiste] = await sql.promise().query(
            'SELECT capacity FROM transportVehicles WHERE idTransportVehicle = ? AND stateVehicle = 1',
            [vehicleId]
        );

        if (vehiculoExiste.length === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        // Crear horario
        const nuevoHorario = await orm.TransportSchedule.create({
            vehicleId: parseInt(vehicleId),
            routeId: parseInt(routeId),
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            priceSchedule: parseFloat(priceSchedule),
            availableSeats: availableSeats || vehiculoExiste[0].capacity,
            statusSchedule: 'scheduled',
            gateTerminal: gateTerminal || '',
            platform: platform || '',
            delayMinutes: 0,
            delayReason: '',
            stateSchedule: true,
            createSchedule: new Date().toLocaleString(),
        });

        return res.status(201).json({ 
            message: 'Horario creado exitosamente',
            idSchedule: nuevoHorario.idTransportSchedule
        });

    } catch (error) {
        console.error('Error al crear horario:', error);
        return res.status(500).json({ 
            message: 'Error al crear el horario', 
            error: error.message 
        });
    }
};

// ================ GESTIÓN DE ASIENTOS ================

// Obtener asientos de un vehículo
transportCtl.obtenerAsientosVehiculo = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        const [asientos] = await sql.promise().query(`
            SELECT ts.*, 
                   CASE WHEN tr.idTransportReservation IS NOT NULL THEN 'ocupado' ELSE 'disponible' END as estado
            FROM transportSeats ts
            LEFT JOIN transportReservations tr ON ts.idTransportSeat = tr.seatId 
                AND tr.statusReservation IN ('confirmed', 'checked_in', 'boarded')
            WHERE ts.vehicleId = ? AND ts.stateSeat = 1
            ORDER BY ts.seatNumber ASC
        `, [vehicleId]);

        return res.json(asientos);
    } catch (error) {
        console.error('Error al obtener asientos:', error);
        return res.status(500).json({ message: 'Error al obtener asientos', error: error.message });
    }
};

// Crear asientos para un vehículo
transportCtl.crearAsientosVehiculo = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { seatConfiguration } = req.body;

        // Validaciones
        if (!seatConfiguration || seatConfiguration.length === 0) {
            return res.status(400).json({ message: 'Configuración de asientos es obligatoria' });
        }

        // Verificar que el vehículo existe
        const [vehiculoExiste] = await sql.promise().query(
            'SELECT capacity FROM transportVehicles WHERE idTransportVehicle = ? AND stateVehicle = 1',
            [vehicleId]
        );

        if (vehiculoExiste.length === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        const asientosCreados = [];

        // Crear asientos según configuración
        for (const seat of seatConfiguration) {
            const nuevoAsiento = await orm.TransportSeat.create({
                vehicleId: parseInt(vehicleId),
                seatNumber: seat.seatNumber,
                seatClass: seat.seatClass || 'economy',
                seatType: seat.seatType || 'aisle',
                amenities: seat.amenities || '',
                statusSeat: 'available',
                additionalFee: parseFloat(seat.additionalFee) || 0,
                stateSeat: true,
                createSeat: new Date().toLocaleString(),
            });

            asientosCreados.push(nuevoAsiento.idTransportSeat);
        }

        return res.status(201).json({ 
            message: 'Asientos creados exitosamente',
            totalAsientos: asientosCreados.length,
            asientosCreados: asientosCreados
        });

    } catch (error) {
        console.error('Error al crear asientos:', error);
        return res.status(500).json({ 
            message: 'Error al crear los asientos', 
            error: error.message 
        });
    }
};

// ================ GESTIÓN DE RESERVAS ================

// Obtener reservas de un horario específico
transportCtl.obtenerReservasHorario = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const [reservas] = await sql.promise().query(`
            SELECT tr.*, u.nameUsers, u.emailUser, 
                   ts.seatNumber, ts.seatClass, ts.seatType,
                   tv.vehicleCode, rt.routeName, rt.origin, rt.destination
            FROM transportReservations tr
            JOIN users u ON tr.usuarioId = u.idUser
            LEFT JOIN transportSeats ts ON tr.seatId = ts.idTransportSeat
            JOIN transportSchedules tsch ON tr.scheduleId = tsch.idTransportSchedule
            JOIN transportVehicles tv ON tsch.vehicleId = tv.idTransportVehicle
            JOIN transportRoutes rt ON tv.routeId = rt.idTransportRoute
            WHERE tr.scheduleId = ?
            ORDER BY tr.createTransportReservation DESC
        `, [scheduleId]);

        const reservasCompletas = reservas.map(reserva => ({
            ...reserva,
            nameUsers: descifrarSeguro(reserva.nameUsers),
            emailUser: descifrarSeguro(reserva.emailUser),
            passengerName: descifrarSeguro(reserva.passengerName),
            passengerEmail: descifrarSeguro(reserva.passengerEmail),
            routeName: descifrarSeguro(reserva.routeName),
            origin: descifrarSeguro(reserva.origin),
            destination: descifrarSeguro(reserva.destination)
        }));

        return res.json(reservasCompletas);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return res.status(500).json({ message: 'Error al obtener reservas', error: error.message });
    }
};

// Crear nueva reserva de transporte
transportCtl.crearReservaTransporte = async (req, res) => {
    try {
        const { 
            usuarioId, scheduleId, seatId, passengerName, passengerDocument,
            passengerEmail, passengerPhone, bookingClass, priceReservation,
            specialRequests, luggageInfo
        } = req.body;

        // Validaciones
        if (!usuarioId || !scheduleId || !passengerName || !passengerEmail || !priceReservation) {
            return res.status(400).json({ message: 'Usuario, horario, pasajero, email y precio son obligatorios' });
        }

        // Generar código de reserva único
        const reservationCode = 'TRP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        // Verificar disponibilidad del asiento si se especifica
        if (seatId) {
            const [asientoOcupado] = await sql.promise().query(`
                SELECT idTransportReservation FROM transportReservations 
                WHERE seatId = ? AND statusReservation IN ('confirmed', 'checked_in', 'boarded')
            `, [seatId]);

            if (asientoOcupado.length > 0) {
                return res.status(400).json({ message: 'El asiento seleccionado ya está ocupado' });
            }
        }

        // Crear reserva
        const nuevaReserva = await orm.TransportReservation.create({
            usuarioId: parseInt(usuarioId),
            scheduleId: parseInt(scheduleId),
            seatId: seatId ? parseInt(seatId) : null,
            reservationCode: reservationCode,
            passengerName: cifrarDatos(passengerName),
            passengerDocument: passengerDocument || '',
            passengerEmail: cifrarDatos(passengerEmail),
            passengerPhone: cifrarDatos(passengerPhone || ''),
            bookingClass: bookingClass || 'economy',
            priceReservation: parseFloat(priceReservation),
            statusReservation: 'confirmed',
            specialRequests: specialRequests || '',
            luggageInfo: luggageInfo || '',
            createTransportReservation: new Date().toLocaleString(),
        });

        // Actualizar asientos disponibles en el horario
        await sql.promise().query(
            'UPDATE transportSchedules SET availableSeats = availableSeats - 1 WHERE idTransportSchedule = ?',
            [scheduleId]
        );

        return res.status(201).json({ 
            message: 'Reserva de transporte creada exitosamente',
            idReservation: nuevaReserva.idTransportReservation,
            reservationCode: reservationCode
        });

    } catch (error) {
        console.error('Error al crear reserva:', error);
        return res.status(500).json({ 
            message: 'Error al crear la reserva', 
            error: error.message 
        });
    }
};

// ================ BÚSQUEDA Y FILTROS ================

// Buscar rutas disponibles
transportCtl.buscarRutas = async (req, res) => {
    try {
        const { origin, destination, transportType, departureDate } = req.query;

        let query = `
            SELECT tr.*, tc.nameCompany, ts.departureTime, ts.arrivalTime, 
                   ts.priceSchedule, ts.availableSeats, tv.vehicleCode
            FROM transportRoutes tr
            JOIN transportCompanies tc ON tr.companyId = tc.idTransportCompany
            JOIN transportVehicles tv ON tr.idTransportRoute = tv.routeId
            JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId
            WHERE tr.stateRoute = 1 AND tc.stateCompany = 1 AND tv.stateVehicle = 1 
            AND ts.stateSchedule = 1 AND ts.statusSchedule = 'scheduled'
        `;

        const params = [];

        if (origin) {
            query += ' AND tr.origin LIKE ?';
            params.push(`%${origin}%`);
        }

        if (destination) {
            query += ' AND tr.destination LIKE ?';
            params.push(`%${destination}%`);
        }

        if (transportType) {
            query += ' AND tr.transportType = ?';
            params.push(transportType);
        }

        if (departureDate) {
            query += ' AND DATE(ts.departureTime) = ?';
            params.push(departureDate);
        }

        query += ' ORDER BY ts.departureTime ASC';

        const [rutas] = await sql.promise().query(query, params);

        const rutasCompletas = rutas.map(ruta => ({
            ...ruta,
            routeName: descifrarSeguro(ruta.routeName),
            origin: descifrarSeguro(ruta.origin),
            destination: descifrarSeguro(ruta.destination),
            nameCompany: descifrarSeguro(ruta.nameCompany)
        }));

        return res.json(rutasCompletas);
    } catch (error) {
        console.error('Error al buscar rutas:', error);
        return res.status(500).json({ message: 'Error al buscar rutas', error: error.message });
    }
};

// ================ ESTADÍSTICAS ================

// Obtener estadísticas del módulo de transporte
transportCtl.obtenerEstadisticas = async (req, res) => {
    try {
        // Estadísticas generales
        const [estadisticas] = await sql.promise().query(`
            SELECT 
                COUNT(DISTINCT tc.idTransportCompany) as totalEmpresas,
                COUNT(DISTINCT tr.idTransportRoute) as totalRutas,
                COUNT(DISTINCT tv.idTransportVehicle) as totalVehiculos,
                COUNT(DISTINCT ts.idTransportSchedule) as totalHorarios,
                COUNT(DISTINCT tres.idTransportReservation) as totalReservas,
                SUM(tres.priceReservation) as ingresoTotal,
                AVG(tres.priceReservation) as precioPromedio
            FROM transportCompanies tc
            LEFT JOIN transportRoutes tr ON tc.idTransportCompany = tr.companyId AND tr.stateRoute = 1
            LEFT JOIN transportVehicles tv ON tr.idTransportRoute = tv.routeId AND tv.stateVehicle = 1
            LEFT JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId AND ts.stateSchedule = 1
            LEFT JOIN transportReservations tres ON ts.idTransportSchedule = tres.scheduleId
            WHERE tc.stateCompany = 1
        `);

        // Rutas más populares
        const [rutasPopulares] = await sql.promise().query(`
            SELECT tr.routeName, tr.origin, tr.destination, COUNT(tres.idTransportReservation) as reservas
            FROM transportRoutes tr
            LEFT JOIN transportVehicles tv ON tr.idTransportRoute = tv.routeId
            LEFT JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId
            LEFT JOIN transportReservations tres ON ts.idTransportSchedule = tres.scheduleId
            WHERE tr.stateRoute = 1
            GROUP BY tr.idTransportRoute
            ORDER BY reservas DESC
            LIMIT 5
        `);

        // Empresas con mejor rating
        const [empresasPopulares] = await sql.promise().query(`
            SELECT tc.nameCompany, tc.ratingCompany, COUNT(tres.idTransportReservation) as reservas
            FROM transportCompanies tc
            LEFT JOIN transportRoutes tr ON tc.idTransportCompany = tr.companyId
            LEFT JOIN transportVehicles tv ON tr.idTransportRoute = tv.routeId
            LEFT JOIN transportSchedules ts ON tv.idTransportVehicle = ts.vehicleId
            LEFT JOIN transportReservations tres ON ts.idTransportSchedule = tres.scheduleId
            WHERE tc.stateCompany = 1
            GROUP BY tc.idTransportCompany
            ORDER BY tc.ratingCompany DESC
            LIMIT 5
        `);

        return res.json({
            estadisticas: {
                ...estadisticas[0],
                ingresoTotal: estadisticas[0].ingresoTotal || 0,
                precioPromedio: estadisticas[0].precioPromedio || 0
            },
            rutasPopulares: rutasPopulares.map(ruta => ({
                ...ruta,
                routeName: descifrarSeguro(ruta.routeName),
                origin: descifrarSeguro(ruta.origin),
                destination: descifrarSeguro(ruta.destination)
            })),
            empresasPopulares: empresasPopulares.map(empresa => ({
                ...empresa,
                nameCompany: descifrarSeguro(empresa.nameCompany)
            }))
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        return res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
};

// ================ FUNCIONES AUXILIARES ================

// Actualizar estado de vehículo
transportCtl.actualizarEstadoVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { statusVehicle } = req.body;

        if (!statusVehicle || !['active', 'maintenance', 'out_of_service'].includes(statusVehicle)) {
            return res.status(400).json({ message: 'Estado inválido' });
        }

        await sql.promise().query(
            'UPDATE transportVehicles SET statusVehicle = ?, updateVehicle = ? WHERE idTransportVehicle = ?',
            [statusVehicle, new Date().toLocaleString(), id]
        );

        return res.json({ message: 'Estado del vehículo actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        return res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
    }
};

// Actualizar estado de horario
transportCtl.actualizarEstadoHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const { statusSchedule, delayMinutes, delayReason } = req.body;

        if (!statusSchedule || !['scheduled', 'boarding', 'departed', 'arrived', 'cancelled', 'delayed'].includes(statusSchedule)) {
            return res.status(400).json({ message: 'Estado inválido' });
        }

        await sql.promise().query(
            'UPDATE transportSchedules SET statusSchedule = ?, delayMinutes = ?, delayReason = ?, updateSchedule = ? WHERE idTransportSchedule = ?',
            [statusSchedule, delayMinutes || 0, delayReason || '', new Date().toLocaleString(), id]
        );

        return res.json({ message: 'Estado del horario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        return res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
    }
};

// Check-in de pasajero
transportCtl.checkInPasajero = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la reserva existe y está confirmada
        const [reserva] = await sql.promise().query(
            'SELECT statusReservation FROM transportReservations WHERE idTransportReservation = ?',
            [id]
        );

        if (reserva.length === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        if (reserva[0].statusReservation !== 'confirmed') {
            return res.status(400).json({ message: 'La reserva no está en estado confirmado' });
        }

        // Actualizar a check-in
        await sql.promise().query(
            'UPDATE transportReservations SET statusReservation = ?, checkInTime = ?, updateTransportReservation = ? WHERE idTransportReservation = ?',
            ['checked_in', new Date(), new Date().toLocaleString(), id]
        );

        return res.json({ message: 'Check-in realizado exitosamente' });
    } catch (error) {
        console.error('Error en check-in:', error);
        return res.status(500).json({ message: 'Error en check-in', error: error.message });
    }
};

module.exports = transportCtl;