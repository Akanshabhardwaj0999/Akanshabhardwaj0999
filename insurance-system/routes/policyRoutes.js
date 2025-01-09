// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const verifyToken = require('../middlewares/verifyToken') 


router.post('/',verifyToken, policyController.createPolicy);
router.get('/', policyController.getPolicies);    
router.delete('/:id',verifyToken, policyController.deletePolicy);

module.exports = router;
