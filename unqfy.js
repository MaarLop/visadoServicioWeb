
const picklejs = require('picklejs');

const artist = require('./artista.js');

const album = require('./album.js');

// const track = require( 'track.js');

// const playList = require ('playlist.js');
 

class UNQfy {

  constructor (){
    this.artistas = [];
    this.tracks = [];
    this.albums = [];
    this.playlists = [];
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres

  }

  getTracksMatchingArtist(artistName) {

  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(param) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    this.artistas.push( new artist.Artista(param.name, param.country));
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.albums.push(new album.Album( params.albumName, params.albumYear));
    let albumres = this.getAlbumByName(params.albumName);
    // albumres.associateArtist(artistName);
    let artistFound= this.getArtistByName(artistName);
    artistFound.albumes.push(albumres);
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
  }

  getArtistByName(name) {
    let artistFound = this.artistas.find( function (a){
       let nameOfArtistIterator= a.name;
       return (name == nameOfArtistIterator );
    });
    return (artistFound);
  }

  getAlbumByName(name) {
    let albumFound = this.artistas.find( function (a){
      let titleOfAlbumIterator= a.albumName;
      return (name == titleOfAlbumIterator);
    });
    return (albumFound);
  }

  getTrackByName(name) {

  }

  getPlaylistByName(name) {

  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */

  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
  artist,
  album
};

