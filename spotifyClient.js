const unqfy= require ('./unqfy.js');
const fs = require('fs');
const access_token= JSON.parse(fs.readFileSync('./spotifyCreds.json', 'utf8')).access_token;
const url_base= 'https://api.spotify.com/v1';

const rp = require('request-promise');

function getAlbumForArtist(artistName){
    const promise_artistid= getIdOfArtist(artistName);
    promise_artistid.then( (id)=>
        {
            options = 
            {
                url: url_base+ '/artists/' +  id+ '/albums',
                headers: { Authorization: 'Bearer ' + access_token},
                json: true,
            }
            rp.get(options).then( (response) =>
            {
                for(let i=0; i<= json.size(); i++)
                {
                    let albs=JSON.parse(response[i]);
                    for (let i=0; i<= albs.size(); i++ )
                    {
                        let alb= albs[i];
                        unqfy.addAlbum(artistName, {name:alb['name'], year:alb['release_date']})
                    }
                }
            })

        })   
}

function getIdOfArtist(name){
    const options = 
    {
        url: url_base+ '/search' ,
        headers: { Authorization: 'Bearer ' + access_token},
        qs: 
        {
                type: 'artist',
                q: name,
                limit:1
        },
        json: true,
    };
    return rp.get(options).then( (response) =>
    {
        console.log(response['items'].id);
    
        
     });
     
}

function popularAlbumForArtist(artistname){
    let artistid= getIdOfArtist(artistname);
    const options = 
    {
       url: url_base+'/artist/' + artistid+ '/top-tracks',
       headers: { Authorization: 'Bearer ' + access_token},
       json: true,
    };
    rp.get(options).then( (response) =>
    {
        let track=(JSON.parse(response))[0];   
        let albumId = trakc[album['id']];
        let alb= getAlbumWithId(albumid);
        unqfy.getAlbumByName( alb['name']);
    });
}

function getAlbumWithId(id){
    let artistid= getIdOfArtist(artistName);
    const options = 
    {
        url: url_base+'/albums/' + id,
        headers: { Authorization: 'Bearer ' + access_token},
        json: true,
    };
       rp.get(options).then( (response) =>
    {
        return JSON.parse(json);
    });
}
module.exports= {
    getAlbumForArtist,
    popularAlbumForArtist,
}