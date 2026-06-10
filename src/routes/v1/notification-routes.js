const express=require('express');
const { TicketController } = require('../../controllers');

const router=express.Router();

//api/v1/tickets ->POST
router.post('/',
            TicketController.create);

module.exports=router;