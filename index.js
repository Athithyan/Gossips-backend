const express = require('express');
const app= express();
const cors= require('cors');
const monk= require('monk');
app.use(cors());
app.use(express.json());
require('dotenv/config');


/**
 * Configuration To Connect To Mongo DB.
 */
const db = monk(process.env.DB_CONNECT, () => {
    console.log('[INFO] {} CONNECTED', process.env.DB_CONNECT);
    });
const gossips = db.get(process.env.GOSSIPS_DB_NAME);


app.get('/gossips',(req,res)=>{
    console.log('Gossips Entry');
    gossips.find()
           .then(gossips =>{
               res.json(gossips);
           });
    console.log('Gossips Exit');
});

function isValidGossip(gossip){
    return gossip.title.toString().trim() !== ''&&
            gossip.content.toString().trim() !== ''
}

app.post('/gossips',(req,res) => {
   if(isValidGossip(req.body)){
       const gossip = {
           name: req.body.title.toString(),
           content:req.body.content.toString(),
           created: new Date()
       };

       gossips.insert(gossip)
              .then(createdGossip => {
                    res.json(createdGossip);
        });
   } else {
        res.status(422);
        res.json({
           message:'[ERROR] PROVIDED INFORMATION IS NOT VALID'
        });
   }
});


/**
 * Config To Specify The Port Used.
 */
app.listen(5000,() =>{
    console.log('[INFO] Express Listining Initiated');
});