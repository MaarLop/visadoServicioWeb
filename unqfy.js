
const picklejs = require('picklejs');

const artist = require('./artista.js');

const album = require('./album.js');

const track = require( './track.js');

const playList = require ('./playList.js');
 

class UNQfy {

  constructor (){
    this.artistas = [];
    this.tracks = [];
    this.albums = [];
    this.playlists = [];
  }

  getTracksMatchingGenres(gen) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    let traksFilter= this.tracks.filter( (tr) => {
      return( track.tr.genero === gen);       
    });
  }

  getTracksMatchingArtist(artistName) {
    let artistFound = this.getArtistByName(artistName);

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
    this.albums.push(new album.Album( params.name, params.year));
    const albumres = this.getAlbumByName(params.albumName);
    const artistFound= this.getArtistByName(artistName);
    album.albumres.associateArtist(artistFound);
    artist.artistFound.addAnAlbum(albumres);
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
    this.tracks.push(new track.Track(params.name, params.duration, params.genero));
    const trackFound = this.getTrackByName(params.name);
    const albumFound = this.getAlbumByName(albumName);
    track.trackFound.associateAlbum(albumFound);
    album.albumFound.addATrack(trackFound);
  }

  getArtistByName(name) {
    const artistFound = this.artistas.find( (a) => {
      const nameOfArtistIterator= a.name;
      return (name === nameOfArtistIterator );
    });
    return (artistFound);
  }

  getAlbumByName(name) {
    const albumFound = this.albums.find( (a) => {
      const titleOfAlbumIterator= a.name;
      return (name === titleOfAlbumIterator);
    });
    return (albumFound);
  }

  getTrackByName(name) {
    const trackFound = this.tracks.find( (t) => {
      const titleOfTrackIterator= t.name;
      return (name === titleOfTrackIterator);
    });
    return (trackFound);
  }

  getPlaylistByName(name) {
    let list = this.playlists.find( function (l){
      return (playList.l.playlistName == name);
    });
    return ( list);
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
    let list = new playList.PlayList (name, maxDuration, genresToInclude);
    playList.list.push(this.getTracksMatchingGenres(genresToInclude));
    this.playlists.push (list);


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
  album,
  track,
  playList
};

