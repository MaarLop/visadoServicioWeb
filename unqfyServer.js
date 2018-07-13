let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
const error=require('./APIerror');
let port = process.env.PORT || 5000;
const fs = require('fs');
const unqmod = require('./unqfy');
 const notificador= require('./notificadorCliente.js')
 const rp = require('request-promise')

router.use(function(req, res, next) {
    console.log('Request received!');
    next();
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

app.use('/api', router);
app.use(errorHandler);


function checkValid(data, expectedKeys){
    if(!valid(data, expectedKeys)){
        throw new error.BadRequest();
    }
}

function valid(data, expect){
    return Object.keys(expect).every(key=> typeof(data[key])===expect[key])
}


 router.route('/artists').get(function (req, res) {
    let unq= unqmod.getUNQfy('unqfy.json')
    let name= req.query.name

    if (name == null ){
        let artists= unq.getAllArtist();
        res.json(artists);
    }
    else{
        let artres= unq.getArtistByPartOfAName(name)       
        res.json( artres)
    }
});



router.route('/artists/:id').get (function (req,res){
    let id = parseInt(req.params.id)
    let unq= unqmod.getUNQfy('unqfy.json')    
    let artist =unq.getArtistById(id);
    
    try
    {
        if (!artist)
        {
            throw new error.ResourceNotFound();
        }
        return res.json({
            "id": artist.id,
            "name": artist.name,
            "albums":artist.albums,
            "country": artist.country
        })
    }
    catch(e)
    {
        res.status(404)
        res.json(e)
    }
   
});

router.route('/artists/:id').delete(  function(req,res){
    let unq= unqmod.getUNQfy ('unqfy.json')
    let artista = unq.getArtistById(req.params.id);
    try
    {
        if (artista == null)
        {
            throw new error.ResourceNotFound();        
        }
        else
        {
            notificador.remove(req.params.id).then( function (response){
                unq.deleteArtist(req.params.id)
            });
            unq.deleteArtist(req.params.id)
            res.json
                ({
                    "success": true,
                })
            unqmod.saveUNQfy(unq, 'unqfy.json');
        }
    }
    catch(e)
    {
        res.status(404)
        res.json(e)
    }
    
});

router.route('/artists').post( function (req,res){
    let unq= unqmod.getUNQfy('unqfy.json')
    let data= req.body
    checkValid(data, {name: 'string', country: 'string'})
    let nameOfArt=req.body.name;
    let countryOfArt=req.body.country;
    let artist= unq.getArtistByName(nameOfArt);

    try
    {
        if (artist !=null)
        {
            throw new error.ResourceAlreadyExists();
        }
        unq.addArtist( {name: nameOfArt, country:countryOfArt} );
        unqmod.saveUNQfy(unq,'unqfy.json');
        let artis= unq.getArtistByName(nameOfArt);
        return res.json({
            "id": artis.id,
            "name": artis.name,
            "albums":artis.albums,
            "country": artis.country
        })
    }
    catch(e)
    {
        res.status(409)
        res.json(e)
    }
        
    });
    //router.route('/albums/:id').delete(function(req,res)
    router.route('/lookTwit/:id').get(function(req,res){
        let unq= unqmod.getUNQfy('unqfy.json')
        let id= parseInt(req.params.id)
        let artist= unq.getArtistById(id)
        try
        {
            if (artist==null)
            {
                throw new error.RelatedResourceNotFoundError()
            }
            unq.twittes(artist.name)
            res.json(unq.getTwitts(artist.name))
            console.log(unq.getTwitts(artist.name))
        }
        catch(e){
            res.status(404)
            res.json(e)
        }
    });

    router.route('/albums').get(function (req, res) 
    {
        let unq= unqmod.getUNQfy('unqfy.json');
        let name = req.query.name;
        if ( name == null){
            let albums = unq.getAllAlbums();
            res.json(albums)
        }
        else{
            let albs= unq.getAlbumPartOfAName(name)
            return res.json(albs);
        }

    });


    router.route ('/albums').post(function (req,res)
    {
        let data= req.body
        checkValid(data ,{name: 'string', year: 'number', artistId: 'number'})
        let unq= unqmod.getUNQfy('unqfy.json');
        let albTitle = req.body.name
        let artistId = parseInt(req.body.artistId)
        let albYear = parseInt(req.body.year)
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
                try
                {
                    if (album!= null)
                    {
                        throw new error.ResourceAlreadyExists();
                    }
                    notificador.update(artist, albTitle)
                    
                    unq.addAlbum(art_name, {name: albTitle, year:albYear})
                    unqmod.saveUNQfy(unq,'unqfy.json')
                    res.json(unq.getAlbumByNameJson (albTitle));
                                   
                }
                catch(e)
                {
                    res.status(409)
                    res.json(e)
                }
            }
        }
        catch(e)
        {
            res.status(404);
            res.json(new error.RelatedResourceNotFoundError());
        }
    });

    router.route('/albums/:id').get(function (req,res)
    {   
        let unq= unqmod.getUNQfy('unqfy.json');
        let _id= parseInt(req.params.id)
        let alb_Res= unq.getAlbumById(_id);
        try
        {    if (alb_Res== null)
            {
                throw new error.ResourceNotFound();
            }
            else
            {
                res.json( alb_Res);
            } 
        }
        catch(e)
        {
            res.status(404)
            res.json(e)
        }
    });

    router.route('/albums/:id').delete(function(req,res)
    {
        let unq= unqmod.getUNQfy ('unqfy.json')
        let _id= parseInt(req.params.id)
        let alb_Res= unq.getAlbumById(_id)
        
        try
        {    if (alb_Res==null)
            {
                throw new error.ResourceNotFound()
            }
            else
            {
                unq.deleteAlbum(_id);
                res.json
                    ({
                        "success": true
                    }); 
                unqmod.saveUNQfy(unq,'unqfy.json');
            }
        }
        catch(e)
        {
            res.status(404)
            res.json(e)
        }
    });
    

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
        console.log("entro aca")
        res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
      });
    router.use(errorHandler);

    


    app.listen(port);

console.log('Server started on port ' + port);