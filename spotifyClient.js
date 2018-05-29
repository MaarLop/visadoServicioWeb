const unqfy= require ('./unqfy.js');

const url_base= 'https://api.spotify.com/v1/artists/';
getAlbumForArtist(artistid){
    const rp = require('request-promise');
    const options = {
           url: + artistid+ '/albums',
           headers: { Authorization: 'Bearer ' + this.accestoke 'ACCESS_TOKEN' },
           json: true
          };
           rp.get(options).then((response) => //hacer algo con response);
    }
  }

  popularAlbumForArtist(artistname){

  }

  getLyric(){

  }