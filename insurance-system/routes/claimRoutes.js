const express = require('express');
const claimController = require('../controllers/claimController');
const router = express.Router();

// Public Routes
router.get('/', claimController.getClaims); // Get all claims
router.post('/',  claimController.createClaim); // Create a new claim (requires auth)
router.patch('/:id',  claimController.updateClaimStatus); // Update claim status (requires auth)

module.exports = router;
