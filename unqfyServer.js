let express = require('express');        // call express
let app = express();                 // define our app using express
let router = express.Router();
let bodyParser = require('body-parser');
const error=require('./APIerror');
let port = process.env.PORT || 5000;        // set our port
const fs = require('fs');
const unqmod = require('./unqfy');

const lastUnqfy= unqmod.getUNQfy('unqfy.json');


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
function checkValid(data, expectedKeys){
    if(!valid(data, expectedKeys)){
        throw new error.BadRequest();
    }
}

function valid(){
    
}

function invalidJson(err, req, res , next){
    if (err){
        throw new error.BadRequest();
    }
 }

 router.route ('/artist').get((req,res)=>
 {  
     let name= req.query.name
     return res.json (req.lastUnqfy.getArtistByPartOfAName(name))
})

 router.route('/artists').get(function (req, res) {
    let lastUnq= lastUnqfy.getAllArtist();
    res.json(lastUnq);
});



router.route('/artists/:id').get (function (req,res){
    let artista = lastUnqfy.getArtistById(req.params.id)
    if (!artista)
    {
        throw new error.RelatedResourceNotFoundError()
    }
    else
    {
        res.json( artista);
    }
   
});

router.route('/artists/:id').delete(  function(req,res){
    let id = parseInt(req.params.id)
    let artista = unqmod.getUNQfy('unqfy.json').getArtistById(id);
    if (artista == null)
    {
        throw new error.RelatedResourceNotFoundError();
        
    }
    else
    {
        unqmod.getUNQfy('unqfy.json').deleteArtist(parseInt(req.params.id));
        res.json
            ({
                "success": true,
            })
        unqmod.saveUNQfy(lastUnqfy, 'unqfy.json');
    }
    
});

router.route('/artists').post( function (req,res){
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;
    let artist= lastUnqfy.getArtistByName(nameOfArt);
    if (!artist){
            lastUnqfy.addArtist( {name: nameOfArt, country:countryOfArt} );
            unqmod.saveUNQfy(lastUnqfy,'unqfy.json');
            res.json(lastUnqfy.getArtistByName(nameOfArt))
            
        
        }        
        else{
            throw new error.ResourceAlreadyExists();
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
    });

    router.route ('/albums').post(function (req,res)
    {
        let unq= unqmod.getUNQfy('unqfy.json');
        let albTitle = req.body.name
        let artistId = parseInt(req.body.artistId)
        let albYear = req.body.year
        let artist = unq.getArtistById(artistId);

        if (artist==null){
           throw new error.RelatedResourceNotFoundError()
        }

        else
        {            
            let art_name= artist.name;
            let album = unq.getAlbumByName(albTitle);
            if (album!= null)
            {
                throw new error.ResourceAlreadyExists();
            }
            unq.addAlbum(art_name, {name: albTitle, year:albYear})
            res.json(unq.getAlbumByNameJson (albTitle));
            unqmod.saveUNQfy(unq,'unqfy.json')
        }
    });

    router.route('/albums/:id').get(function (req,res)
    {   
        let unq= unqmod.getUNQfy('unqfy.json');
        let id = parseInt(req.params.id);
        let alb_Res= unq.getAlbumById(id);
        if (alb_Res!= null)
        {
            throw new error.RelatedResourceNotFoundError()
        }
        else
        {
            return res.json( req.alb_Res);
        }
    });

    router.route('/albums/id').delete(function(req,res,next)
    {
        let unq= lastUnqfy.getUNQfy ('unqfy.json')
        let alb_Res= lastUnqfy.getAlbumById(req.params.id)
        if (alb_Res!=null)
        {
            throw new error.RelatedResourceNotFoundError()
        }
        else
        {
            unq.deleteAlbum(req.params.id)
            res.json(
                {
                    success:true
                }) 
                unqmod.saveUNQfy(unq,'unqfy.json');
        }
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



    app.listen(port);

    console.log('Server started on port ' + port);