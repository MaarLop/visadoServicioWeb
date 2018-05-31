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

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

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
    res.json( lastUnqfy.deleteArtist(req.params.id));
    saveUNQfy(lastUnqfy, 'unqfy.json');
})
//buscar artista por nombre
router.route('/artists?name=:nombre').get(  function(req,res){
   // res.json( lastUnqfy.deleteArtist(req.params.id));
    res.json( lastUnqfy.getArtistByPartOfAName(req.params.nombre) );
})


//agregar artista  con un json
router.route('/artists/:id').delete(  function(req,res){
    res.json( lastUnqfy.deleteArtist(req.params.id));
    saveUNQfy(lastUnqfy, 'unqfy.json');
})




//-----------


app.listen(port);
console.log('Magic happens on port ' + port);