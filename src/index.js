const express=require('express');

const {serverConfig}=require('./config');
const apiRoutes=require('./routes');

const app=express();

app.use(express.json());       //registers a middleware for all upcoming routes, it helps to parse
                               // the incoming json request body
app.use(express.urlencoded({extended:true}));   //makes sure to read the url encoded stuff

app.use('/api',apiRoutes);
//const {sendBasicEmail}=require('./services/email-services');
const jobs=require('./utils/common/cron-jobs');

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT : ${serverConfig.PORT}`);
    jobs();

    /*sendBasicEmail(
        'support@admin.com',
        'abc@gmail.com',
        'This is a testing mail',
        'Hello, the flight u booked is in 24 hours, be ready'
    )*/
});