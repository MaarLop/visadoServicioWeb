let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');
const error=require('./APIerror');
let port = process.env.PORT || 5000;        // set our port
const fs = require('fs');
const unqfyClient = require('./unqfyClient.js');
const notificador= require('./notificador.js')

router.use(function(req, res, next) {
    console.log('Request received!');
    next()
});

app.get( '/', (req,res)=>{
        res.send('received');

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
    if (err){
        throw new error.BadRequest()
    }
  });
  function checkValid(data, expectedKeys){
    if(!valid(data, expectedKeys)){
        throw new error.BadRequest();
    }
}

function valid(data, expect){
    return Object.keys(expect).every(key=> typeof(data[key])===expect[key])
}

  router.route('/subscribe').post(function (req, res) {
    let data= req.body
    let id= data.id
    let mail= data.mail

    checkValid(data, {artistId: 'number', email: 'string'})
      try
      {
        if (unqfyClient.getArtistById(id))
        {
          notificador.suscribe(id,mail)
        }                
      }
      catch(e){
        res.status(404)
        res.json(e)
      }
});  
  router.route('/unsuscribe').post( function (req,res){
    let data= req.body
    checkValid(data, {artistId: 'number', email: 'string'})
      try
      {
        if (unqfyClient.getArtistById(id))
        {
          notificador.unsuscribe(id,mail)
        }   
      }        
      catch(e)
      {
        res.status(404)
        res.json(e)
      }
  });  
  router.route('/notify').post( function (req,res){
    let data = req.body
    let id   = data.artistId;
    let subj = data.subject
    let msj  = data.message
    let from = data.from

    checkValid(data, {artistId: 'number', subject:'string', message:'string', from: 'string'})
      try
      {
        notificador.notify(id, subj,msj, from)            
      }
      catch(e){
        res.status(404)
        res.json(e)
      }
    })

    router.route('/suscriptions').get( function (req,res){
        let data = req.body
        checkValid(data, {artistId: 'number'})
          try
          {
            if (unqfyClient.getArtistById(id))
            {
              let lisa= notificador.getSuscriptions(id)
              res.json
              ({
                "artistId": data.artistId,
                "suscriptores": lista
               })
            }         
          }
          catch(e){
            res.status(404)
            res.json(e)
          } 
    })

    router.route('/suscriptions').delete( function (req,res){
        let data= req.body
        let id= data.artistId;
        checkValid(data, {artistId: 'number'})
          try{
            if (unqfyClient.getArtistById(id))
            {
              notificador.deleteSuscribes(id)
            }   
          }  
          catch(e){
            res.status(404)
            res.json(e)
          } 
    })

app.use('/api', router);
app.use(errorHandler);

    function errorHandler(err,req, res, next){
        if (err instanceof error.APIerror){
            res.status(err.status);
            res.json({status:err.status, errorCode: err.errorCode});
        }
        else
        {
            res.status(500);
            res.json({status:500,errorCode:'Internal Server Error'})
        }
        
    }
    router.use((req, res) => {
        res.status(404);
        res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
      });
    router.use(errorHandler);



    app.listen(port);

console.log('Server started on port ' + port);