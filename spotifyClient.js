// const unqmod= require ('./unqfy.js');
const fs = require('fs');
const access_token= JSON.parse(fs.readFileSync('./spotifyCreds.json', 'utf8')).access_token;
const url_base= 'https://api.spotify.com/v1';

const rp = require('request-promise');

const loadJson= require ('./main.js');

// function getUNQfy(filename) {
//     let unqfy = new unqmod.UNQfy();
//     if (fs.existsSync(filename)) {
//       console.log();
//       unqfy = unqmod.UNQfy.load(filename);
//     }
//     return unqfy;
//   }
  
//   // Guarda el estado de UNQfy en filename
//   function saveUNQfy(unqfy, filename) {
//     console.log();
//     unqfy.save(filename);
//   }
const unqfy= loadJson.getUNQfy ('unqfy.json');

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
            return rp.get(options).then( (response) =>
            {   
                let albums = response['items'];
                let albList= [];
                for(let i=0; i< albums.length; i++)
                {
                    let currentAlbum = albums[i];
                    let title = currentAlbum['name'];
                    let yearOf = currentAlbum['release_date'];
                    
                    unqfy.addAlbum(artistName, { name: title, year:yearOf })
                }
                loadJson.saveUNQfy(unqfy,'unqfy.json')

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
        let result = response;
        return result['artists'].items[0].id;
      }) 
     
}

module.exports= {
    getAlbumForArtist,
    popularAlbumForArtist,
}