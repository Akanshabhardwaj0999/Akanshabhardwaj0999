const sql = require("mssql");
const dbConfig = require("../config/db");  

// Add a new Policy to the database
const assignPolicy = async (assignPolicy) => {
    const { userId, policyId, date } = assignPolicy;

    try {
       
        await sql.query`
            INSERT INTO AssignPolicies (userId, policyId, date)
            VALUES (${userId}, ${policyId}, ${date})
        `;
        console.log("data added successfully!");
    } catch (err) {
        console.error("Error adding data:", err);
    }
};

// Delete policy from Database using policyId
const deleteAssignedPolicy = async (assignid) => {
    try {
        await sql.connect(dbConfig);  
        await sql.query`
            DELETE FROM AssignPolicies WHERE id = ${assignid}
        `;
        console.log("data deleted successfully!");
    } catch (err) {
        console.error("Error deleting data:", err);
    }
};

// Get all policies from the database
const getAllAssignedPolicies = async () => {
    try {
        const result = await sql.query("SELECT * FROM AssignPolicies");
        return result.recordset;
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];  // Return empty array if error occurs
    }
};

module.exports = { getAllAssignedPolicies, assignPolicy, deleteAssignedPolicy };



