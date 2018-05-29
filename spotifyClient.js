const unqfy= require ('./unqfy.js');
const fs = require('fs');
const filename = '/spotifyCreds.json';


const access_token= "BQArVffaYlMVXvIcfmp5ncNEcbcoehQheGqxXq4r9yNaIHo3QJ7K-KL_h8pAGNVlQel9ICveVYv0fvIXxEI5YD-5p-rlaDaZpoBDOHOuGQnoTSGfSIrgbQdrelEjV_xDRyXznbz3kkCkpw127VMgBwcfKC_sPoASko8";
// const json= fs.readFile(filename, (err, data) => {
//                 if (err) {
//                 console.log('Ouch! Error!');
//                 throw err;
//                 }
//                 else{
//                     let obj= JSON.parse(json);
//                     const token= obj['access_token'];
//                 }

// });

const url_base= 'https://api.spotify.com/v1/artists/';
getAlbumForArtist(artistid){ // usar el search con el nombre del artista 
    const rp = require('request-promise');
    const options = {
           url: url_base + artistid+ '/albums',
           headers: { Authorization: 'Bearer ' + access_token},
           json: true,
          };
           rp.get(options).then( (response) =>{
           for(let i=0; i<= json.size(); i++){
            let alb=JSON.parse(json[i]);
            unqfy.addAlbum( alb['name'], alb['release_date'])
           }
        });
    }

  popularAlbumForArtist(artistname){
    const rp = require('request-promise');
    const options = {
           url: url_base + artistid+ '/top-tracks',
           headers: { Authorization: 'Bearer ' + access_token},
           json: true,
          };
           rp.get(options).then( (response) =>{
            let track=JSON.parse(json);   
            let albumId = trakc[albumid];

            let alb= this.getAlbumWithId(albumid);
            unqfy.getAlbumByName( alb['name']);
        
        });
}