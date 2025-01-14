const sql = require("mssql");
const dbConfig = require("../config/db"); 

// Add a new Policy to the database
const addPolicy = async (policy) => {
    const {policyId, policyName, premium, duration } = policy;

    try {
        await sql.query`
            INSERT INTO policies (id, policyName, premium, duration)
            VALUES (${policyId},${policyName}, ${premium}, ${duration})
        `;
        console.log("Policy added successfully!");
    } catch (err) {
        console.error("Error adding policy:", err);
    }
};

// Delete policy from Database using policyId
const deletePolicy = async (policyId) => {
    try {
        await sql.connect(dbConfig); 
        await sql.query`
            DELETE FROM policies WHERE policyId = ${policyId}
        `;
        console.log("Policy deleted successfully!");
    } catch (err) {
        console.error("Error deleting policy:", err);
    }
};

// Get all policies from the database
const getAllPolicies = async () => {
    try {
        const result = await sql.query("SELECT * FROM policies");
        return result.recordset;
    } catch (err) {
        console.error("Error fetching policies:", err);
        return [];  
    }
};

module.exports = { getAllPolicies, addPolicy, deletePolicy };
