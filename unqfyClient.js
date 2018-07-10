const url_  = 'http://localhost:5000/api/artists/'
// const url_  = 'http://172.20.0.21:5000/api/artists'
const rp    = require('request-promise');
const error = require('./APIerror');

function getArtistById(artistId)
{    
    const options = 
    {
        url: url_+artistId ,
        json: true
    }
    return rp.get(options).then( (response) =>
    {   
         try{
            if( response.id >=0)
            {
                return true
                console.log("aca si debe entrar")
            }
            else
            {
                throw new error.ResourceNotFound();
                return false
                console.log("no deberia entrar aca")
                
            }
        }
        catch(e)
        {
            console.log("tampoco deberia entrar en el catch")
            res.status(404)
            res.json(e)
        }
       
    });
}

module.exports= 
{
    getArtistById
}