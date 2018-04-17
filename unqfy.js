
const picklejs = require('picklejs');

const artistmod = require('./artista.js');

const albummod = require('./album.js');

const trackmod = require( './track.js');

const playListmod = require ('./playList.js');


class UNQfy {

  constructor (){
    this.artistas = [];
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
    const albumsOfArtist = artistFound.albumes;
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
      albumres.associateArtist(artistFound);
      artistFound.addAnAlbum(albumres);
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
 //albumName, { name: trackName, duration: trackDuraction, genres: trackGenero 
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    const albumFound = this.getAlbumByName(albumName);
    let artista= this.getArtistByName(albumFound.getArtistName());
    if (this.artistas.includes(artista)&& artista.haveAlbum(albumFound)){
      const newTrack =new trackmod.Track(params.name, params.duration, params.genres);
      newTrack.associateAlbum(albumFound);
      albumFound.addATrack(newTrack);
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
    let artistaCon= this.artistas.find ((art)=>{
      return art.haveAlbumWithName(name);
    })
    let artista= this.getArtistByName(artistaCon.name);
    return artista.albumConNombre(name);

 }

  getTrackByName(name) {
    let artistaQueTieneAlbumConTrack= this.artistas.find((art)=>{
      return art.haveAlbumWith(name);
    });
    let artista= this.getArtistByName(artistaQueTieneAlbumConTrack.name);
    let res= artista.getTrackWith(name);
    let track= new trackmod.Track (res.name, res.duration, res.genres);
    return track; 
  }

  getAlbumsOfArtist(art){
    let artis = this.getAlbumByName(art.name);
    return artis.albumes;
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
    let dur= maxDuration;
      genresToInclude.forEach ((g)=>{
        if (dur>0 ){
          list.push(this.getTracksMatchingGenres(g));
          lis.cortarPorDuracion();
          dur= dur - list.getTracksDuration();
        }
      });
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
  
  //Artista,Track, Album, PlayList
  artistmod,
  albummod,
  trackmod,
  playListmod

};


