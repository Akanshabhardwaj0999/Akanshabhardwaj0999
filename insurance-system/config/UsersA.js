const sql = require("mssql");
const connectDB = require("./db");

const createUserTable = async () => {
    try {
        await connectDB();  // Connect to the database

        // Correct SQL query to create 'userA' table
        const query = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'userA')
            BEGIN
                CREATE TABLE userA (
                    id NVARCHAR(50) PRIMARY KEY NOT NULL ,   
                    name NVARCHAR(100) NOT NULL,                  
                    email NVARCHAR(255) NOT NULL,                 
                    password NVARCHAR(255) NOT NULL               
                );
            END;
        `;

        await sql.query(query);  // Execute the query
        console.log("userA table created successfully (if not already exists).");
    } catch (err) {
        console.error("Error creating userA table:", err);
    }
};

module.exports = createUserTable;

