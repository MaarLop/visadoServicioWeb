const unqmod= require ('./unqfy.js');
const fs = require('fs');
const access_token= JSON.parse(fs.readFileSync('./spotifyCreds.json', 'utf8')).access_token;
const url_base= 'https://api.spotify.com/v1';

const rp = require('request-promise');

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
  const unqfy= getUNQfy ('unqfy.json');

function getAlbumForArtist(artistName){
    let promise_artistid = getIdOfArtist(artistName);
    promise_artistid.then((id) =>
        {
            options = 
            {
                url: url_base+ '/artists/' +  id+ '/albums',
                headers: { Authorization: 'Bearer ' + access_token},
                json: true,
            }
            rp.get(options).then( (response) =>
            {   
                let albums = response['items'];
                for(let i=0; i< albums.length; i++)
                {
                    let currentAlbum = albums[i];
                    let title = currentAlbum['name'];
                    let yearOf = currentAlbum['release_date'];
                    unqfy.addAlbum(artistName, { name: title, year:yearOf })

                }
                saveUNQfy(unqfy,'unqfy.json')
            })

        })   
}


function popularAlbumForArtist(artistname){
    let promise_artistid = getIdOfArtist(artistname);
    promise_artistid.then ((id)=>
    {
        options = 
        {
            url: url_base+'/artists/' + id+ '/top-tracks',
            headers: { Authorization: 'Bearer ' + access_token},
            qs:
            {
                country: 'AR'
            },
            json: true,
        };
        rp.get(options).then( (response) =>
        {
            let track = response['tracks'][0]
            let alb = track['album'];
            unqfy.addAlbum(artistname, {name:alb['name'], year:alb['release_date']});
            console.log (unqfy.getJsonAlbumByName (alb['name']))
        });
        saveUNQfy(unqfy, 'unqfy.json');
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
        let result = response;
        return result['artists'].items[0].id;
      }) 
     
}

module.exports= {
    getAlbumForArtist,
    popularAlbumForArtist,
}