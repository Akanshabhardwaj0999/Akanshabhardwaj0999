const claimModel = require('../models/claimModel');
const { v4: uuidv4 } = require('uuid');

const getClaims = (req, res) => {
    const claims = claimModel.getAllClaims();
    res.json(claims);
};

const createClaim = (req, res) => {
    const { userId, policyId, description } = req.body;

    if (!userId || !policyId || !description) {
        return res.status(400).json({ message: 'User ID, Policy ID, and description are required' });
    }


    const claim = {
        claimId:uuidv4(),
        assignId,
        description,
        status: 'Pending' // Default status is "Pending"
    };

    claimModel.addClaim(claim);
    res.status(201).json(claim);
};

const updateClaimStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be one of "Pending", "Approved", or "Rejected"' });
    }

    claimModel.updateClaimStatus(id, status);
    res.status(200).json({ message: 'Claim status updated successfully' });
};

module.exports = { getClaims, createClaim, updateClaimStatus };
