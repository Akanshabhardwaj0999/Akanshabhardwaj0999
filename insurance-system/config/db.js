const sql = require('mssql')
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,

  options: {
   // encrypt: true, // For Azure SQL Server (if using)
    trustServerCertificate: true, // Use this for local development
  }
}

// (async () => {
//  try {
//   // make sure that any items are correctly URL encoded in the connection string
//   await sql.connect(sqlConfig)
//   const result = await sql.query`select * from mytable where id = ${value}`
//   console.dir(result)
//  } catch (err) {
//   // ... error checks
//  }
// })()

const connectDB = async () => {
    try {
      // Establish the database connection
      await sql.connect(sqlConfig);
      console.log('Connected to SQL Server');
    } catch (err) {
      console.error('Database connection error:', err.message);
      process.exit(1); // Exit the application if unable to connect
    }
  };
  
  module.exports = connectDB;