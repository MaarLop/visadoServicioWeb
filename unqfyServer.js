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

function valid(data, expect){
    return Object.keys(expect).every(key=> typeof(data[key])===expect[key])
}

// function invalidJson(err, req, res , next){
//     if (err){
//         throw new error.BadRequest();
//     }
//  }

 router.route ('/artist').get((req,res)=>
 {  
     let name= req.query.name
     return res.json (lastUnqfy.getArtistByPartOfAName(name));
})

 router.route('/artists').get(function (req, res) {
    let lastUnq= lastUnqfy.getAllArtist();
    res.json(lastUnq);
});



router.route('/artists/:id').get (function (req,res){
    try
    {
        let artist =lastUnqfy.getArtistById();
        if (!artist)
        {
            throw new error.ResourceNotFound();
        }
    }
    catch(e)
    {
        res.json(e)
    }
   
});

router.route('/artists/:id').delete(  function(req,res){
    let id = parseInt(req.params.id)
    let artista = unqmod.getUNQfy('unqfy.json').getArtistById(id);
    try
    {
        if (artista == null)
        {
            throw new error.RelatedResourceNotFoundError();        
        }
        else
        {
            unqmod.getUNQfy('unqfy.json').deleteArtist(parseInt(id));
            res.json
                ({
                    "success": true,
                })
            unqmod.saveUNQfy(lastUnqfy, 'unqfy.json');
        }
    }
    catch(e)
    {
        res.json(e)
    }
    
});

router.route('/artists').post( function (req,res){
    let data= req.body
    checkValid(data, {name: 'string', country: 'string'})
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;
    let artist= lastUnqfy.getArtistByName(nameOfArt);
    try
    {
        if (!artist){
            lastUnqfy.addArtist( {name: nameOfArt, country:countryOfArt} );
            unqmod.saveUNQfy(lastUnqfy,'unqfy.json');
            res.json(lastUnqfy.getArtistByName(nameOfArt))
        }        
        else
        {
            throw new error.ResourceAlreadyExists();
        }
    }
    catch(e)
    {
        res.json(e)
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
        try
        {
            if (artist==null)
            {
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
        }
        catch(e)
        {
            res.json(e)
        }
    });

    router.route('/albums/:id').get(function (req,res)
    {   
        let unq= unqmod.getUNQfy('unqfy.json');
        let id = parseInt(req.params.id);
        let alb_Res= unq.getAlbumById(id);
        try
        {    if (alb_Res!= null)
            {
                throw new error.RelatedResourceNotFoundError()
            }
            else
            {
                return res.json( req.alb_Res);
            } 
        }
        catch(e)
        {
            res.json(e)
        }
    });

    router.route('/albums/id').delete(function(req,res,next)
    {
        let unq= unqmod.getUNQfy ('unqfy.json')
        let alb_Res= lastUnqfy.getAlbumById(req.params.id)
        try
        {    if (alb_Res!=null)
            {
                throw new error.RelatedResourceNotFoundError()
            }
            else
            {
                unq.deleteAlbum(req.params.id)
                res.json(
                    {
                        "success":true
                    }); 
                unqmod.saveUNQfy(unq,'unqfy.json');
            }
        }
        catch(e)
        {
            res.json(e)
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
            if (!(compareUrls(validUrlArtists, req.url))|| !(compareUrls(validUrlAlbums, req.url))){
                throw new error.ResourceNotFound();
            }

            else {
                res.status(500);
                res.json({status:500,errorCode:'Internal Server Error'})
            }
        }
    }



    app.listen(port);

console.log('Server started on port ' + port);