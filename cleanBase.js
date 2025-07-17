const mysql = require('mysql2/promise');

const dbConfig = {
  host: '31.97.42.126',
  port: 3306,
  user: 'linkear',
  password: '0987021692@Rj',
  database: 'tickets'
};

(async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado a la base de datos');

    // Desactivar claves foráneas
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Obtener todas las tablas
    const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);

    if (tables.length === 0) {
      console.log('⚠️ No hay tablas para eliminar.');
    } else {
      // Borrar cada tabla
      for (const row of tables) {
        const tableName = row.table_name;
        await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
        console.log(`🗑️ Tabla eliminada: ${tableName}`);
      }
    }

    // Reactivar claves foráneas
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    await connection.end();
    console.log('✅ Tablas eliminadas y conexión cerrada');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
