// const policyModel = require('../models/policyModel');
const policyModel = require('../models/fsPolicyModel');
const {v4 : uuidv4} = require("uuid")

// Get all policies from the database
const getPolicies = async (req, res) => {
    try {
        const policies = await policyModel.getAllPolicies();
        if (!policies || policies.length === 0) {
            return res.status(404).json({ message: 'No policies found' });
        }
        res.json(policies);
    } catch (err) {
        console.error('Error fetching policies:', err);
        res.status(500).json({ message: 'An error occurred while fetching policies' });
    }
};

// Create a new policy
const createPolicy = async (req, res) => {
    const { policyName, premium, duration } = req.body;

    // Validate input fields
    if (!policyName || !premium || !duration) {
        return res.status(400).json({ message: 'Policy name, premium, and duration are required' });
    }

    if (isNaN(premium) || premium <= 0) {
        return res.status(400).json({ message: 'Premium must be a positive number' });
    }

    if (isNaN(duration) || duration <= 0) {
        return res.status(400).json({ message: 'Duration must be a positive number' });
    }

    // Create the new policy object
    const newPolicy = {policyId:uuidv4(), policyName, premium, duration };

    try {
        // Call the model to insert the new policy
        await policyModel.addPolicy(newPolicy);
        res.status(201).json({ message: "Policy added successfully", policy: newPolicy });
    } catch (err) {
        console.error('Error adding policy:', err);
        res.status(500).json({ message: 'An error occurred while adding the policy' });
    }
};

// Delete a policy by ID
const deletePolicy = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Valid policy ID is required' });
    }

    try {
        // Call the model to delete the policy by ID
        const result = await policyModel.deletePolicy(id);
        if (result === 0) {
            return res.status(404).json({ message: 'Policy not found' });
        }
        res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (err) {
        console.error('Error deleting policy:', err);
        res.status(500).json({ message: 'An error occurred while deleting the policy' });
    }
};

module.exports = { getPolicies, createPolicy, deletePolicy };
