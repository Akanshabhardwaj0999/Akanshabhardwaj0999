const sql = require("mssql");
const connectDB = require("./db");

const createAssignPolicyTable = async () => {
    try {
        await connectDB(); 
        const query = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AssignPolicies')
            BEGIN
                CREATE TABLE AssignPolicies (
                    assignId INT PRIMARY KEY IDENTITY,
                    userId INT,
                    policyId INT,
                    date DATE
                );
            END
        `;

        await sql.query(query); 
        console.log("AssignPolicies table created successfully (if not already exists).");
    } catch (err) {
        console.error("Error creating AssignPolicies table:", err);
    }
};

module.exports = createAssignPolicyTable;
