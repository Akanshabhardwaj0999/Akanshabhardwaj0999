const sql = require('mssql');
const dbConfig = require("../config/db")

// Get all users from the database
const getAllUsers = async () => {
    try {
        const result = await sql.query('SELECT * FROM Users');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching users:', err);
        return [];
    }
};


// Add a new user to the database
const addUser = async (user) => {
    try {
        const { name, email, password } = user; 
        await sql.query`INSERT INTO Users (id, name, email, password) VALUES (14, ${name}, ${email}, ${password})`; 
    } catch (err) {
        console.error('Error adding user:', err);
    }
};


// Delete a user by id
const deleteUser = async (id) => {
    try {
        await sql.connect(dbConfig);
        await sql.query`DELETE FROM Users WHERE id = ${id}`;
    } catch (err) {
        console.error('Error deleting user:', err);
    }
};

module.exports = { getAllUsers, addUser, deleteUser };

