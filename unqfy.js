
const picklejs = require('picklejs');

const artistmod = require('./artista.js');

const albummod = require('./album.js');

const trackmod = require( './track.js');

const listaRepmod = require('./listaReproduccion.js');


class UNQfy {

  constructor (){
    this.artistas = [];
    this.playlists = [];
  }

  getTracksMatchingGenres(gen) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    let traksFilter= this.getTracks();
    traksFilter.filter((t)=>{
      return t.genres === gen;
    })
    return traksFilter;
  }
  getTracks(){
    const tracks=[];
    this.artistas.forEach((ar)=>{
      tracks.push(this.getTracksMatchingArtist(ar))
    });
    return tracks.reduce(function (t1,t2){
      return t1.concat(t2);
    })
  }

  getTracksMatchingArtist(artist) {
    const albumsOfArtist = this.getDiscography(artist.name);
    let tracksOfArtist=[];
    albumsOfArtist.forEach(alb => {
      tracksOfArtist.push (alb.getTracks());
    });
    let tracksReduce=tracksOfArtist.reduce(function (lis1, lis2){
      return lis1.concat(lis2);
    })

    return tracksReduce;
  }
  getDiscography(nameOfArtist){
    const artistFound = this.getArtistByName(nameOfArtist);
    const discography = artistFound.getAlbumes();
    return discography;
  }

  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(param) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    let artist = new artistmod.Artista(param.name, param.country);
    this.artistas.push( artist);
    console.log('Artista agregado')
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
      console.log(' Album agregado')
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
    const artista= this.getArtistByName(albumFound.getArtistName());

    if (this.artistas.includes(artista) && artista.haveAlbumWithName(albumName)){

      const newTrack =new trackmod.Track(params.name, params.duration, params.genres);
      newTrack.associateAlbum(albumFound);
      albumFound.addATrack(newTrack);
      console.log(' Track agregado')
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
    console.log(artistFound);
  }

  getAlbumByName(name) {   
    let artistaCon= this.artistas.find ((art)=>{
      return art.haveAlbumWithName(name);
    })
    let artista= this.getArtistByName(artistaCon.name);
    let album= artista.albumConNombre(name);
    return album;
    console.log(album);

 }

  getTrackByName(name) {
    let artistaQueTieneAlbumConTrack= this.artistas.find((art)=>{

      return art.haveTrackWith(name);
    });

    let artista= this.getArtistByName(artistaQueTieneAlbumConTrack.name);

    let track = artista.getTrackWith(name);

    return track; 
    
    console.log(track);
  }

  getAlbumsOfArtist(art){
    let artis = this.getAlbumByName(art.name);
    return artis.albumes;
    console.log (artis.albumes);
  }

  getPlaylistByName(name) {
    let list = this.playlists.find( (l) => {
      return (l.name === name);
    });

    return ( list);
    console.log(list);
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    
    );*/
    let playlist = new listaRepmod.ListaReproduccion(name, genresToInclude, maxDuration);

      genresToInclude.forEach ((g)=>{
        if (playlist.tiempoRestante()> 0 ){
          playlist.addTracks(this.getTracksMatchingGenres(g));
        }
      this.playlists.push(playlist)
      });
      console.log (' Playlist agregada')
      
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, artistmod.Artista.prototype, albummod.Album.prototype, trackmod.Track.prototype, listaRepmod.ListaReproduccion.prototype];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
  artistmod,
  albummod,
  trackmod,
  listaRepmod
};


