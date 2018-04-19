

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');
// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

function main() {
let unqfy = getUNQfy('unqfy.json');

let command = process.argv.slice(2,3).toString();

switch (command ){

  case 'addArtist':
    let nombre = process.argv.slice(3,4);
    let pais = process.argv.slice(4);
    unqfy.addArtist({name: nombre, country: pais});
    saveUNQfy(unqfy, 'unqfy.json');
    break;

  case 'addAlbum':
    let artista =  process.argv.slice(3,4);
    let titulo = process.argv.slice(4,5);
    let anho = process.argv.slice(5);
    unqfy.addAlbum (artista,{name:titulo,year:anho});
    saveUNQfy(unqfy, 'unqfy.json');
    break;

  case 'addTrack':
  let album = process.argv.slice(3,4);
  let tituloTrack = process.argv.slice(4,5);
  let duracion = process.argv.slice(5,6);
  let genero = process.argv.slice(6);
  unqfy.addTrack(album,{name:tituloTrack,duration:duracion, genres: genero});
  saveUNQfy(unqfy, 'unqfy.json');
  break;

  case 'addPlaylist':
  let nombrePlayList = process.argv.slice(3,4);
  let generos= process.argv.slice(4,5);
  let duracionMax= process.argv.slice(5);
  unqfy.addPlaylist(nombrePlayList,generos,duracionMax);
  saveUNQfy(unqfy, 'unqfy.json');
  break;

  case 'getArtistByName':
  let nombreArtista = process.argv.slice(3,4);
  unqfy.getArtistByName(nombreArtista);
  break;

  case  'getAlbumByName':
  let nombreAlbum = process.argv.slice(3,4);
  unqfy.getAlbumByName(nombreAlbum);
  break;

  case 'getTrackByName':
  let nombreDeTrack = process.argv.slice(3,4);
  unqfy.getTrackByName(nonombreDeTrackmbre);
  break;

  case 'getPlaylistByName':
  let playListName = process.argv.slice(3,4);
  unqfy.getPlaylistByName(playListName);
  break;

  }
  
}

main();



