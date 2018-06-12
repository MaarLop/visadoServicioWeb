
const picklejs = require('./pickle.js');

const artistmod = require('./artista.js');

const albummod = require('./album.js');

const trackmod = require( './track.js');

const listaRepmod = require('./listaReproduccion.js');

const spotifyClient = require ('./spotifyClient.js');

const rp = require('request-promise');

const musixmatchClient= require ('./musixmatchClient.js');

const fs = require('fs');

function getUNQfy(filename) {
  let unqfy = new UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy =UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

class UNQfy {

  constructor (){
    this.artistas = [];
    this.playlists = [];
  }

  getTracksMatchingGenres(gen) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    let traksFilter= [];
    gen.forEach((g)=>{
      traksFilter.push(this.trackWithGenre(g));
    });
    return traksFilter.reduce(function (t1,t2){
      return t1.concat(t2);
    });
  }
  trackWithGenre(g){
    let traksFilter= this.getTracks();
    return traksFilter.filter((t)=>{
      return t.genres === g;
    });
  }

  getTracks(){
    const tracks=[];
    this.artistas.forEach((ar)=>{
      tracks.push(this.getTracksMatchingArtist(ar))
    });
    return tracks.reduce(function (t1,t2){
      return t1.concat(t2);
    });
  }

  getTracksMatchingArtist(artist) {
    const albumsOfArtist = this.getDiscography(artist.name);
    let tracksOfArtist=[];
    albumsOfArtist.forEach(alb => {
      tracksOfArtist.push (alb.getTracks());
    });
    let tracksReduce=tracksOfArtist.reduce(function (lis1, lis2){
      return lis1.concat(lis2);
    });

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
    let id= this.artistas.length +1
    let artist = new artistmod.Artista(id,param.name, param.country);
    this.artistas.push( artist);
    console.log('Artista agregado')
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    let id= (this.getAllAlbums().length)+1
     const artistFound= this.getArtistByName(artistName);
    if (this.artistas.includes(artistFound) ){
      const albumres = new albummod.Album( params.name, params.year,id);
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
    let albumFound = this.getAlbumByName(albumName);
    let artista= this.getArtistByName(albumFound.getArtistName());

    if (this.artistas.includes(artista) && artista.haveAlbumWithName(albumName)){

      const newTrack =new trackmod.Track(params.name, params.duration, params.genres);
      newTrack.associateAlbum(albumFound);
      albumFound.addATrack(newTrack);
      console.log(' Track agregado')
      this.setLyric(params.name)
    }
    else{
      console.log('No existe album '+ albumName);
    }
    
  }

  getArtistByName(name) {
    let artistFound = this.artistas.find( (a) => {
      const nameOfArtistIterator= a.name;
      return (name === nameOfArtistIterator );
    });
    return (artistFound);
  }

  getArtistByPartOfAName(name){
    let art_res= []
    let artistFound=this.artistas.filter( (a) => {
      const nameOfArtistIterator= a.name;
      return ( nameOfArtistIterator.includes (name) );
    });
    return (art_res.concat(artistFound))
  }

  getAlbumPartOfAName(name){
    let artist = this.artistas.find((artista)=>{
      return artista.hasAlbumWithPartOfTitle(name);
    })
    return this.artistas.getAlbumWithMatchTitle(name);
  }

  getAlbumByName(name) {   
  let artista = (this.artistas.find( (a) => {
                return a.haveAlbumWithName(name);
          }));
    if(!artista){
      return artista
    }
    else{
      return( artista.albumConNombre(name))
    }
 }

  getTrackByName(name) {
    let artistaQueTieneAlbumConTrack= this.artistas.find((art)=>{
      return art.haveTrackWith(name);
    });

    let artista= this.getArtistByName(artistaQueTieneAlbumConTrack.name);
    console.log (artista)
    let track = artista.getTrackWith(name);

    return track; 
  }

  getAlbumsOfArtist(art){
    let artis = this.getAlbumByName(art.name);
    return artis.albums;
  }

  getPlaylistByName(name) {
    let list = this.playlists.find( (l) => {
      return (l.name === name);
    });
    return ( list);
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    
    );*/
    let playlist = new listaRepmod.ListaReproduccion(name, genresToInclude, maxDuration);
    playlist.addTracks(this.getTracksMatchingGenres(genresToInclude));
    this.playlists.push(playlist)
    console.log (' Playlist agregada')  
  }

  
  getAllArtist(){
    let all_artistas=[]
    if (this.artistas.length ===0){
       return all_artistas;
    }
    else{
      this.artistas.forEach((a)=>{
        let art = a.toJson()
        all_artistas.push(art);
      })
      return all_artistas;
    }
  }

  getAllAlbums(){
    let albs= []
      this.artistas.forEach((art)=>{
        let albOfArt= art.getAlbumes()
        albs.concat(albOfArt);
      })
      return albs
  }
  
  getArtistById(nro_id){
    let index= nro_id-1;
    let artist = this.getAllArtist()[index];
    return artist;
  }

  getAlbumById(nro_id){
    let todosLosAlbumes = this.getAllAlbums()
    let alb_res= todosLosAlbumes.find( (l) => {
      return (l.id === nro_id);
    });
    return ( alb_res);
  }

  deleteArtist(nro_id){
    delete this.artistas[nro_id];
  }

  getJsonAlbumByName(name) {   
    let artistWithAlbum = (this.artistas.find( (a) => {
                  return a.haveAlbumWithName(name);
            }))
    let albumFound = artistWithAlbum.albumConNombre(name);
    return albumFound.toJson();
   }

   setLyric (track_name){
    let track = this.getTrackByName (track_name)
    if (track.getLyric() == null){
      let lyric_promise= musixmatchClient.getLyricTrack(track.getTitle(), track.album.getArtistName());
      lyric_promise.then ( (letra)=>{
        track.setlyric(letra);
        this.save('unqfy.json')
      });
    }
   }

   getLyricOfTrack(title){
     let track= this.getTrackByName(title)
      return track.getLyric()
   }

   popularAlbumForArtist(name){
    let client = new spotifyClient.SpotifyClient();
    let promise_albums= client.getAlbumForArtist(name).then((lista_albums_json)=> {
      this.addAllAlbums( name, lista_albums_json)
    })
  }
  addAllAlbums( name_art, lista_albums_json){
    let sistema_previo = getUNQfy ('unqfy.json')
    lista_albums_json.forEach ((a)=>{
      let alb= new albummod.Album (a['name'], a['year'])
      sistema_previo.addAlbum (name_art, {name: alb.name, year: alb.year});
    })
    saveUNQfy (sistema_previo, 'unqfy.json')
    console.log ('Discografia agrergada exitosamente');
   }

   getAlbumByNameJson(name){
     let album = this.getAlbumByName (name);
     return album.toJson();
   }

   deleteAlbum(id){
     let artist = this.artistas.find ((a) => {
      return (a.haveAlbumWithId(id));
    });
    return (artist.getAlbumWithId(id));
   }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, artistmod.Artista, albummod.Album, trackmod.Track, listaRepmod.ListaReproduccion];
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
  listaRepmod,
  spotifyClient,
  getUNQfy,
  saveUNQfy
};


