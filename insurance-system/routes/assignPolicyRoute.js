const express = require('express');
const assignPolicyController = require('../controllers/assignPolicyController');
const router = express.Router();

router.get('/', assignPolicyController.getAllAssignedPolicy);
router.post('/', assignPolicyController.createAssignedPolicy);
router.delete('/:id', assignPolicyController.deleteAssignedPolicy);
module.exports = router;
