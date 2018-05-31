const unqfy= require ('./unqfy.js');
const fs = require('fs');
const access_token= "BQD6xcbhZd-FFVMBv2rpkniYmWfhmM02n8Yhx_1XEBZXT2Y4Ouzs36iqIzJaHvMRskDgQZqvCv6nIBvVbcJ568mvpfrJY-lnNHJ2B79xGssg8S0c3WoiGjWqHdOkfdWIJlPPvksiwFtpwEQaOlHWVk9HJ36Cq1LN0UY";
const url_base= 'https://api.spotify.com/v1';

function getAlbumForArtist(artistName){ 
    const rp = require('request-promise');
    const artistid= this.getIdOfArtist(artistName);
    const options = {
           url: url_base+ '/artists/' + artistid+ '/albums',
           headers: { Authorization: 'Bearer ' + access_token},
           json: true,
          };
           rp.get(options).then( (response) =>{
           for(let i=0; i<= json.size(); i++){
            let alb=JSON.parse(json[i]);
            unqfy.addAlbum(artistName, {name:alb['name'], year:alb['release_date']})
           }
        });
}
function getIdOfArtist(name){
    const rp= require('request-promise');
    const options = {
        url: url_base+ '/search?q=/' + name + '&type=artist',
        headers: { Authorization: 'Bearer ' + access_token},
        json: true,
       };
       rp.get(options).then( (response) =>{
        let first= (JSON.parse(json))[0];
        let id= first['id'];
        return id;
     });
};

function popularAlbumForArtist(artistname){
const rp = require('request-promise');
let artistid= this.getIdOfArtist(artistName);
const options = {
       url: url_base+'/artist/' + artistid+ '/top-tracks',
       headers: { Authorization: 'Bearer ' + access_token},
       json: true,
      };
       rp.get(options).then( (response) =>{
        let track=(JSON.parse(json))[0];   
        let albumId = trakc[album['id']];//

        let alb= getAlbumWithId(albumid);
        unqfy.getAlbumByName( alb['name']);
    
    });

function getAlbumWithId(id){
    const rp = require('request-promise');
    let artistid= getIdOfArtist(artistName);
    const options = {
        url: url_base+'/albums/' + id,
        headers: { Authorization: 'Bearer ' + access_token},
        json: true,
      };
       rp.get(options).then( (response) =>{
        return JSON.parse(json);
        });
    }
}
module.exports= {
    getAlbumForArtist,
    popularAlbumForArtist,
}