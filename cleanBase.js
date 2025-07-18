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

    // Verificar si existe la tabla staff
    const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'tickets' AND table_name IN ('staff', 'staffAssignments')
    `);

    console.log('Tablas relacionadas con staff encontradas:', tables);

    if (tables.length === 0) {
      console.log('❌ No existen las tablas de staff');
      console.log('💡 Ejecuta el script SQL proporcionado');
    } else {
      console.log('✅ Tablas de staff encontradas');
      
      // Verificar estructura
      for (const table of tables) {
        console.log(`\n📋 Estructura de ${table.table_name}:`);
        const [columns] = await connection.query(`DESCRIBE ${table.table_name}`);
        console.table(columns);
      }
    }

    await connection.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();