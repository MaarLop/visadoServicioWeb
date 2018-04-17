
const picklejs = require('picklejs');
/*
const artistmod = require('./artista.js');

const albummod = require('./album.js');

const trackmod = require( './track.js');

const playListmod = require ('./playList.js');
*/
 module.exports(Artista,Track, Album, PlayList);

class UNQfy {

  constructor (){
    this.artistas = [];
    this.tracks = [];
    this.albums = [];
    this.playlists = [];
  }

  getTracksMatchingGenres(gen) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    const traksFilter= this.tracks.filter( (tr) => {
      return( trackmod.tr.genero === gen);       
    });
    return traksFilter;
  }

  getTracksMatchingArtist(artistName) {
    const artistFound = this.getArtistByName(artistName);
    const albumsOfArtist = artistmod.artistFound.albumes;
    let traksOfArtist=[];
    albumsOfArtist.forEach(alb => {
      traksOfArtist.push (alb.tracks);
    });
    return traksOfArtist;
  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(param) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    this.artistas.push( new artistmod.Artista(param.name, param.country));
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    const artistFound= this.getArtistByName(artistName);
    if (this.artistas.includes(artistFound) ){
      const albumres = new albummod.Album( params.name, params.year);
      this.albums.push(albumres);
      albummod.albumres.associateArtist(artistFound);
      artistmod.artistFound.addAnAlbum(albumres);
    }
    else{
      console.log('No existe el artista '+artistName);
    }
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
    const albumFound = this.getAlbumByName(albumName);
    if (this.albums.includes(albumFound)){
      const trackFound =new trackmod.Track(params.name, params.duration, params.genero);
      this.tracks.push(trackFound);
      trackmod.trackFound.associateAlbum(albumFound);
      albummod.albumFound.addATrack(trackFound);
    }
    else{
      console.log('No existe album '+ albumName);
    }
    
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
    const list = this.playlists.find( (l) => {
      return (playListmod.l.playlistName === name);
    });
    return ( list);
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
    const list = new playListmod.PlayList (name, maxDuration, genresToInclude);
    playListmod.list.push(this.getTracksMatchingGenres(genresToInclude));
    this.playlists.push (list);


  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artista,Track, Album, PlayList ];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
  /*
  artistmod,
  albummod,
  trackmod,
  playListmod
  */
};

