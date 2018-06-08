// const unqmod= require ('./unqfy.js');
const fs = require('fs');
const access_token= JSON.parse(fs.readFileSync('./spotifyCreds.json', 'utf8')).access_token;
const url_base= 'https://api.spotify.com/v1';

const rp = require('request-promise');

class SpotifyClient {

    constructor (){
        this.promisAlbums= []
    }

    getAlbumForArtist(artistName){
        let promise_artistid = this.getIdOfArtist(artistName);
        return promise_artistid.then((id) =>
        {
            const options = 
            {
                url: url_base+ '/artists/' +  id+ '/albums',
                headers: { Authorization: 'Bearer ' + access_token},
                json: true,
            }
            return rp.get(options).then( (response) =>
            {   
                let albums = response['items'];
                for(let i=0; i< albums.length; i++)
                {
                    let currentAlbum = albums[i];
                    let title = currentAlbum['name'];
                    let yearOf = currentAlbum['release_date'];
                    
                    this.promisAlbums.push ({ name: title, year:yearOf })
                }
            })
        }).then (()=>{ 
             return this.promisAlbums
        })
         
    }

    getIdOfArtist(name){
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
            let result = response;
            return result['artists'].items[0].id;
        }) 
     
        }
}

module.exports= {
    SpotifyClient,
}