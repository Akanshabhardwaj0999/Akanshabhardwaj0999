// const UserModel = require('../models/userModel');
const UserModel = require('../models/fsUserModel');
const { v4: uuidv4 } = require('uuid');

// Add new user
const addUser =async (req, res) => {
  const { name, email, password} = req.body;
  

  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = { id:uuidv4(), name, email, password};
  await  UserModel.addUser(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
};

// Get all users
const getAllUsers = async (req, res) => {
  const users = await UserModel.getAllUsers();
  res.json(users);
};

// Delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;
  UserModel.deleteUser(id);
  res.status(200).json({ message: "User deleted successfully" });
};

const getUsersJson=async(req, res)=>{
  let cacheValue = await client.get("users");
  if(cacheValue) 
  return  res.json(cacheValue);
  let response = await fetch("users.txt");
  let data = await response.json();
  await client.set("users",JSON.stringyfy(data));
  await client.expire("users",120);
  return res.join(data);
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  getUsersJson
};

