const sql = require('mssql');
const dbConfig = require("../config/db")

// Get all users from the database
const getAllUsers = async () => {
    try {
        const result = await sql.query('SELECT * FROM userA');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching users:', err);
        return [];
    }
};


// Add a new user to the database
const addUser = async (user) => {
    const {id, name, email, password } = user; 
    try {
        await sql.query`
        INSERT INTO userA (id , name, email, password)
         VALUES ( ${id},${name}, ${email}, ${password})
         `; 
        console.log("user added successfully!");
        
    } catch (err) {
        console.error('Error adding user:', err);
    }
};


// Delete a user by id
const deleteUser = async (id) => {
    try {
        await sql.connect(dbConfig);
        await sql.query`DELETE FROM userA WHERE id = ${id}`;
    } catch (err) {
        console.error('Error deleting user:', err);
    }
};

module.exports = { getAllUsers, addUser, deleteUser };

