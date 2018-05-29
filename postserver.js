let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');

let port = process.env.PORT || 5000;        // set our port
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');
// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

router.use(function(req, res, next) {
    // do logging
    console.log('Request received!');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

//--------
router.route('/artists').get(function (req, res) {
    res.json(getUNQfy('unqfy.json').getAllArtist());

    
});


router.route('/track')
    // create a track (accessed at POST http://localhost:8080/api/track)
    .post(function (req, res) {
        console.log(req.body.title);
        res.json({ message: 'Track created!' });
    });








//-----------


app.listen(port);
console.log('Magic happens on port ' + port);