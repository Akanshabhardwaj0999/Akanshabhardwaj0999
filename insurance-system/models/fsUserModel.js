const fs = require('fs');
const path = './data/users.txt';


//function to get all users
const getAllUsers = () => {
    const data = fs.readFileSync(path, 'utf8');
    return data ? JSON.parse(data) : [];
};


//function to create new user
const addUser = (user) => {
    const users = getAllUsers();
    users.push(user);
    fs.writeFileSync(path, JSON.stringify(users, null, 2));
};


//function to delet user using id
const deleteUser = (id) => {
    let users = getAllUsers();
    users = users.filter(user => user.id != id);
    fs.writeFileSync(path, JSON.stringify(users, null, 2));
};

module.exports = { getAllUsers, addUser, deleteUser };