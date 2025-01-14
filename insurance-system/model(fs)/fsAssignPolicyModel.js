const fs = require('fs');
const path = './data/assignPolicy.txt'; 

// Function to get all assignments
const getAllAssignedPolicies = () => {
    const data = fs.readFileSync(path, 'utf8');
    return data ? JSON.parse(data) : [];  
};

// Function to add a new assignment
const createAssignedPolicy = (assignment) => {
    const assignments = getAllAssignedPolicies();
    assignments.push(assignment); 
    fs.writeFileSync(path, JSON.stringify(assignments, null, 2)); 
};

// function to delete assignedPolicy
const deleteAssignedPolicy = (id) => {
  let assignments = getAllAssignedPolicies();
    assignments = assignments.filter(val => val.id != id);
    fs.writeFileSync(path, JSON.stringify(assignments, null, 2));
}; 

module.exports = { getAllAssignedPolicies, createAssignedPolicy, deleteAssignedPolicy};