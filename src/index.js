const express=require('express');
const {serverConfig}=require('./config');
const apiRoutes=require('./routes');

const jobs=require('./utils/common/cron-jobs');

const EmailServices=require('./services/email-services');
const {createChannel,subscribeMessage}=require('./utils/common/messageQueue');
const {REMINDER_BINDING_KEY}=require('./config/server-config');

const setupAndStartServer=async()=>{

    const app=express();

    app.use(express.json());         //registers a middleware for all upcoming routes, it helps to parse
                                     // the incoming json request body
    
    app.use(express.urlencoded({extended:true})); //makes sure to read the url encoded stuff
    
    app.use('/api',apiRoutes);

    const channel=await createChannel();
    subscribeMessage(channel,EmailServices.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(serverConfig.PORT,()=>{
        console.log(`Successfully started the server on PORT : ${serverConfig.PORT}`);
    });
}

setupAndStartServer();