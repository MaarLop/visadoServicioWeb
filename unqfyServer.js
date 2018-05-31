let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');

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

//--------
router.route('/artists').get(function (req, res) {
    res.json(lastUnqfy.getAllArtist());
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
    res.json( lastUnqfy.getArtistByPartOfAName(req.params.nombre) );
})


//agregar artista  con un json
router.route('/artists').post( function (req,res){
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;

    lastUnqfy.addArtist( {name: nameOfArt, country:countryOfArt});
    saveUNQfy(lastUnqfy,'unqfy.json');
    res.json({
        'success':true
    });
});




//-----------


app.listen(port);
console.log('Server started on port ' + port);