const express=require('express');

const {serverConfig}=require('./config');
const apiRoutes=require('./routes');

const app=express();

app.use(express.json());       //registers a middleware for all upcoming routes, it helps to parse
                               // the incoming json request body
app.use(express.urlencoded({extended:true}));   //makes sure to read the url encoded stuff

app.use('/api',apiRoutes);

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT : ${serverConfig.PORT}`);
});