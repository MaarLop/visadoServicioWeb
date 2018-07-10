let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');
const error=require('./APIerror');
let port = process.env.PORT || 5001;        // set our port
const fs = require('fs');
const unqfyClient = require('./unqfyClient.js');
const notifmod= require('./notificador.js')
const unqmod = require('./unqfy.js');

const notificador= new notifmod.Notificador();


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
        console.log('entro  en el checkValid')
        throw new error.BadRequest();
    }
}

function valid(data, expect){
    return Object.keys(expect).every(key=> typeof(data[key])===expect[key])
}

  router.route('/subscribe').post(function (req, res) {
    let data= req.body
    let id= data.artistId
    let mail= data.email
    checkValid(data, {artistId: 'number', email: 'string'})
      try
      {
        if (unqfyClient.getArtistById(id))
        {
          notificador.subscribe(id,mail)
          res.json({
            "success":true
          })
        }   
        else{
          res.json({
            "success":false
          })  
        }             
      }
      catch(e){
        res.status(404)
        res.json(new error.RelatedResourceNotFoundError())
      }
});  
  router.route('/unsubscribe').post( function (req,res){/////
    let data= req.body
    let id= parseInt(data.artistId)
    let mail = data.email
    checkValid(data, {artistId: 'number', email: 'string'})
    console.log(data)
      try
      {
        if (unqfyClient.getArtistById(id))
        {
          notificador.unsubscribe(id,mail)
          res.json({
            "success": true
          })
        }   
      }        
      catch(e)
      {
        res.status(404)
        res.json(e)
      }
  });  
  router.route('/notify').post( function (req,res){////
    let data = req.body
    let id   = parseInt(data.artistId);
    let subj = data.subject
    let msj  = data.message
    let from = data.from

    checkValid(data, {artistId: 'number', subject:'string', message:'string', from: 'string'})
      try
      { 
      res.json(notificador.notify(id, subj,msj, from) )
                   
      }
      catch(e){
        res.status(404)
        res.json(e)
      }
    })

    router.route('/suscriptions').post( function (req,res){
        let data = req.body
        let id = parseInt(data.artistId)
        checkValid(data, {artistId: 'number'})
          try
          {
            if (unqfyClient.getArtistById(id))
            {
              try{
                  if( notificador.getSuscriptions(id) ==null){
                    throw new error.ResourceNotFound()
                  }
                res.json
                ({
                    "artistId": data.artistId,
                    "suscriptores": notificador.getSuscriptions(id)
                })
              }
              catch(e){
                res.status(404)
                res.json(e)
              }
            }         
          }
          catch(e){
            res.status(404)
            res.json(e)
          } 
    })

    router.route('/suscriptions').delete( function (req,res){
        let data= req.body
        let id= parseInt(data.artistId)
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