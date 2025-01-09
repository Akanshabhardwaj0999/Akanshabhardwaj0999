// const assignPolicyModel = require('../models/assignPolicyModel'); 
const assignPolicyModel = require('../models/fsAssignPolicyModel');  
const {v4 : uuidv4} = require("uuid")

// Function to get all assignedPolicies
const getAllAssignedPolicy = async (req, res) => {
    try {
        const assignments = await assignPolicyModel.getAllAssignedPolicies();
        res.json(assignments); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve assignments", error: err.message });
    }
};

// Function to assign a policy to a user
const createAssignedPolicy = async (req, res) => {
    const { userId, policyId, assignedDate } = req.body;

    // Validate required fields
    if (!userId || !policyId || !assignedDate) {
        return res.status(400).json({ message: 'User ID, Policy ID, and Assigned Date are required' });
    }

    // Validate userId and policyId are numbers
    if (isNaN(userId) || isNaN(policyId)) {
        return res.status(400).json({ message: 'User ID and Policy ID must be valid numbers' });
    }

    // Validate assignedDate format
    const parsedDate = new Date(assignedDate);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Assigned Date must be a valid date' });
    }

    const newAssignment = {
        assignId:uuidv4(),
        userId: userId,
        policyId: policyId,
        assignedDate: assignedDate
    };

    try {
       
        await assignPolicyModel.createAssignedPolicy(newAssignment);
        res.status(201).json({
            message: "Policy assigned successfully",
            assignment: newAssignment
        });
    } catch (err) {
        console.error(err);  
        res.status(500).json({ message: "Failed to assign policy", error: err.message });
    }
};

// Function to delete an assignment by ID
const deleteAssignedPolicy = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Assignment ID is required' });
    }

    try {
        // Delete the assignment by id
        const result = await assignPolicyModel.deleteAssignedPolicy(id);

        // Check if the result is 0, meaning no assignment was deleted (ID not found)
        if (result === 0) {
            return res.status(404).json({ message: 'Assignment ID not found' });
        }

        // Return success message if deletion is successful
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Failed to delete assignment", error: err.message });
    }
};

module.exports = { getAllAssignedPolicy, createAssignedPolicy, deleteAssignedPolicy };


