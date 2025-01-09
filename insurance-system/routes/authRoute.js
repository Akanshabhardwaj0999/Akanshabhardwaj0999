const authToken= require('../controllers/authController')


const express=require('express')
const router= express.Router();

router.post('/',authToken);


module.exports = router;