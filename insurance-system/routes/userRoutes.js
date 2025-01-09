const express = require('express');
const userController = require('../controllers/userController'); 
const verifyToken = require('../middlewares/verifyToken') 

const router = express.Router();

router.get('/', verifyToken,userController.getAllUsers);
router.post('/', userController.addUser);
router.delete('/:id', verifyToken,userController.deleteUser);

module.exports = router;
