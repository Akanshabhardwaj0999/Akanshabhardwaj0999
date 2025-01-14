const sql = require("mssql");
const connectDB = require("./db");

const createClaimsTable = async () => {
    try {
        await connectDB();

        const query = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Claims')
            BEGIN
                CREATE TABLE Claims (
                    ClaimId NVARCHAR(100) PRIMARY KEY ,     
                    assignedId INT,                             
                    description VARCHAR(255),                   
                    status VARCHAR(50)                          
                );
            END;
        `;

        await sql.query(query); 
        // console.log("Claims table created successfully (if not already exists).");
    } catch (err) {
        console.error("Error creating Claims table:", err);
    }
};

module.exports = createClaimsTable;
