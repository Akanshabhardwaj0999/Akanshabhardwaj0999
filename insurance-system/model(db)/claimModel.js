const sql = require("mssql");
const dbConfig = require("../config/db"); 

// Add a new Policy to the database
const addClaim = async (claim) => {
    const {claimId,assignedId, description, status } = claim;

    try {
        await sql.query`
            INSERT INTO Claims (claimId, assignedId, description, status)
            VALUES (${claimId}, ${assignedId}, ${description}, ${status})
        `;
        console.log("claim added successfully!");
    } catch (err) {
        console.error("Error adding claim:", err);
    }
};

const updateClaimStatus = async (claimId, status) => {
    try {
        // Connect to the database
        
        console.log(claimId,status);
        
        // Update the claim's status in the Claims table
        const result = await sql.query`
            UPDATE Claims
            SET status = ${status}
            WHERE claimId = ${claimId}
        `;
console.log(result)
        // Check if any rows were affected (i.e., the claim exists)
        if (result.rowsAffected[0] === 0) {
            console.log("Claim not found");
        } else {
            console.log("Claim status updated successfully!");
        }
    } catch (err) {
        console.error("Error updating claim status:", err);
    }
};

// Get all policies from the database
const getAllClaims = async () => {
    try {
        const result = await sql.query("SELECT * FROM Claims");
        return result.recordset;
        // console.log(result.recordset);
        
    } catch (err) {
        console.error("Error fetching claims:", err);
        return []; 
    }
};

module.exports = { getAllClaims, addClaim, updateClaimStatus };
