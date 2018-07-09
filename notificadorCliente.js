// const url_  = 'http://172.20.0.22:5001/api/'
const url_  = 'http://localhost:5001/api/'
const rp    = require('request-promise');
const error = require('./APIerror');

function update(art, album)
{    console.log (' update de artist ')
    return this.notify(art.id, 'UNQfy <unqfy.notify@gmail.com', 
    'New album for artists'+art.name,
    'se agrego el album '+ album)
}

function notify( id, from, sub, body_)
{
    return rp({
        url: url_+'notify/',
        method: 'post',
        body:{
            artistId: id,
            from: from,
            subject: sub,
            message: body_
        }
    })
}

function remove(artId)
{
    console.log("eliminar artista")
    return rp({
        url: url_+'suscriptions/',
        method: 'delete',
        body:{
            artistId: artId
        }
    })
}

module.exports= 
{
    update,
    remove
}

