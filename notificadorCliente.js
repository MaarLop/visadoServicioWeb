//const url_  = 'http://172.20.0.22:5001/api/'
const url_  = 'http://localhost:5001/api/'
const rp    = require('request-promise');

function update(art, album)
{   console.log(' esto es el update')
    return notify(art.id, 'UNQfy <unqfy.notify@gmail.com', 
    'New album for artists'+art.name,
    'se agrego el album '+ album)
}

function notify( id, from, sub, body_)
{
    console.log(" esto es el nofify")
    let options= {
        url: url_+'notify/',
        method: 'POST',
        json: true,
        body:{
            artistId: parseInt(id),
            from:     from,
            subject:  sub,
            message:  body_
        }
    }
    return rp(options)

}

function remove(artId)
{
    let options= {
        url: url_+'suscriptions/',
        method: 'DELETE',
        json: true,
        body:{
            artistId: parseInt(artId)
        }
    }
    return rp(options).then(function (response) {
        console.log("DELETE succeeded with status %d", response.statusCode);
    })
    
}

module.exports= 
{
    update,
    remove
}

