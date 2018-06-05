let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');
const error=require('./APIerror');
let port = process.env.PORT || 5000;        // set our port
const fs = require('fs');
const unqmod = require('./unqfy');

const lastUnqfy= getUNQfy('unqfy.json');


function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

router.use(function(req, res, next) {
    // do logging
    console.log('Request received!');
    next(); // make sure we go to the next routes and don't stop here
});

app.get( '/', (req,res)=>{
    res.send('received');
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(errorHandler);
//--------
router.route('/artists').get(function (req, res) {
    let lastUnq= getUNQfy('unqfy.json').getAllArtist();
    res.json(lastUnq);
});

router.route('/artists/:id').get (function (req,res){
   let artist= lastUnqfy.getArtistById(req.params.id)
    res.json( artist.toJson() );
});

router.route('/artists/:id').delete(  function(req,res){
    lastUnqfy.deleteArtist(req.params.id);
    res.json({
        "success": true,
        "mensage": "artist deleted successfully"
    })
    saveUNQfy(lastUnqfy, 'unqfy.json');
})
//buscar artista por nombre
router.route('/artists?name=:nombre').get(  function(req,res){
    res.json( lastUnqfy.getArtistByPartOfAName(req.query.name) );
})

router.get('/albums', (req, res) => {
    const albums = model.unqfy
      .findAlbumsByName(req.query.name)
      .map(a => a.toJson());

    res.json(albums);
  });

//agregar artista  con un json
router.route('/artists').post( function (req,res,next){
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;
    let artist= lastUnqfy.getArtistByName(nameOfArt);
    console.log(artist);
    if (!artist){
        lastUnqfy.addArtist( {name: nameOfArt, country:countryOfArt} );
        res.json({
            'success':true
        });
    }        
    else{
        next(new error.ResourceAlreadyExists());
       
    }
    saveUNQfy(lastUnqfy,'unqfy.json');
    
});

function errorHandler(err,req, res, next){
    console.error(err);
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
//-----------


app.listen(port);
console.log('Server started on port ' + port);