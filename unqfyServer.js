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

router.route('/artists/:nombre_artista', (req,res)=>{
   let artist= lastUnqfy.getArtistByName(req.params.nombre_artista)
    res.json( artist.toJson() );
})




.get(function (req, res) {// /api/artist/id.
    res.json(getUNQfy('unqfy.json').getAllArtist());
    if (req.query)
        res.json({ message: 'PONG!' });
    else
        res.json({ message: 'no mandaste el ping' });
});








//-----------


app.listen(port);
console.log('Magic happens on port ' + port);