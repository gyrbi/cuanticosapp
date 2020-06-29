const express = require('express');
let router = express.Router();

// 	GET Principal Donaciones (Usuario particular)
router.get('/userpar', async(req,res)=>{
    res.status(403).json({"msg":"Vista del usuario Particular"});
});//get /userpar

module.exports = router;