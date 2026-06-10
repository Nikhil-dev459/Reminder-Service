const sender=require('../config/email-config');
const TicketRepository=require('../repositories/ticket-repository');
const {Enums}=require('../utils/common');
const {PENDING,SUCCESS,FAILED}=Enums.NOTIF_STATUS;

const repo=new TicketRepository();

const sendBasicEmail=async(mailFrom,mailTo,mailSubject,mailBody)=>{
    try{
        const response=await sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        });
        console.log(response);
    } 
    catch(error){
        console.log(error);
    } 
}

const fetchPendingEmails=async(timestamp)=>{
    try{
        const response=await repo.get({status:PENDING});
        return response;
    } 
    catch(error){
        console.log(error);
    }
}

const updateStatus=async(ticketId,data)=>{
    try{
        const response=await repo.update(ticketId,data);
        return response;
    } 
    catch(error){
        console.log(error);
    }
}

const createNotification=async(data)=>{
    try{
        const response=await repo.create(data);
        return response;
    } 
    catch(error){
       console.log(error); 
    }
}

module.exports={
    sendBasicEmail,
    fetchPendingEmails,
    updateStatus,
    createNotification
}

/**
 * SMTP -> a@b.com
 * receiver -> d@e.com
 * 
 * from: support@noti.com
 */