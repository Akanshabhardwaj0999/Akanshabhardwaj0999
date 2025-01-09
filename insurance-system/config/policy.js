const sql = require("mssql");
const connectDB = require("./db");

const createPoliciesTable = async () => {
    try {
        await connectDB(); 

        const query = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Policies')
            BEGIN
                CREATE TABLE Policies (
                    id INT PRIMARY KEY IDENTITY,
                    policyName NVARCHAR(100),
                    premium DECIMAL(10, 2),
                    duration INT
                );
            END;
        `;

        await sql.query(query); 
        console.log("Policies table created successfully (if not already exists).");
    } catch (err) {
        console.error("Error creating Policies table:", err);
    }
};

module.exports = createPoliciesTable;



 
 