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

router.route('/artists/:id').get (function (req,res,next){
    let artista= lastUnqfy.getArtistById(req.params.id)
    if (!artista)
    {
        next( new error.RelatedResourceNotFoundError())
    }
    else
    {
        let artist= lastUnqfy.getArtistById(req.params.id)
        res.json( artist.toJson());
    }
   
});

router.route('/artists/:id').delete(  function(req,res,next){
    let id = req.params.id
    let artista = lastUnqfy.getArtistById(id)
    if (!artista)
    {
        next( new error.RelatedResourceNotFoundError())
        
    }
    else
    {
        lastUnqfy.deleteArtist(req.params.id);
        res.json
            ({
                "success": true,
            })
        saveUNQfy(lastUnqfy, 'unqfy.json');
    }
    
})

router.route('/artists').get(  function(req,res)
{
    res.json( lastUnqfy.getArtistByPartOfAName(req.query.name) );
})

//agregar artista  con un json
router.route('/artists').post( function (req,res,next){
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;
    let artist= lastUnqfy.getArtistByName(nameOfArt);
    console.log(artist);
    if (!artist){
        lastUnqfy.addArtist( {name: nameOfArt, country:countryOfArt} );
        res.json
        ({
            'success':true
        });
    saveUNQfy(lastUnqfy,'unqfy.json');
    }        
    else{
        next(new error.ResourceAlreadyExists());
       
    }
    
});

router.route('/albums').get(function (req, res) 
{
    let albums = lastUnqfy.getAllAlbums();
    res.json(albums);
});

router.route ('/albums').get(function (req,res)
{
    let albs= lastUnqfy.getAlbumPartOfAName(query.params.name)
    res.json(albs);
})

router.route ('/albums').post(function (req,res,next)
{
    let albTitle = req.body.name
    let artistId = req.body.artistId
    let albYear = req.body.year
    let artist = lastUnqfy.getArtistById(artistId);

    if (!artist){
       next(new error.RelatedResourceNotFoundError())
    }

    else
    {
        let album = lastUnqfy.getAlbumByName(albTitle)
        if (!album)
        {
            let art_name= artist.getName();
            lastUnqfy.addAlbum(art_name, {name: albTitle, year:albYear})
            res.json
            ({
                success:true
            })
        }
        else
        {
            next(new error.ResourceAlreadyExists());
        }
    }
})

router.route('/albums/id').get(function (req,res,next)
{
    let alb_Res= lastUnqfy.getAlbumById(req.param.id)
    if (!alb_Res)
    {
        next( new error.RelatedResourceNotFoundError())
    }
    else
    {
        res.json( alb_Res.toJson())
    }
})

router.route('/albums/id').delete(function(req,res,next)
{
    let alb_Res= lastUnqfy.getAlbumById(req.params.id)
    if (!alb_Res)
    {
        next( new error.RelatedResourceNotFoundError())
    }
    else
    {
        lastUnqfy.deleteAlbum(req.params.id)
        res.json(
            {
                success:true
            })   
    }
})

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