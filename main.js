

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

let command = process.argv[2].toString();

switch (command ){

  case 'addArtist':
    let nombre = process.argv[3];
    let pais = process.argv[4];
    unqfy.addArtist({name: nombre, country: pais});
    saveUNQfy(unqfy, 'unqfy.json');
    break;

  case 'addAlbum':
    let artista =  process.argv[3];
    let titulo = process.argv[4];
    let anho = process.argv[5];
    unqfy.addAlbum (artista,{name:titulo,year:anho});
    saveUNQfy(unqfy, 'unqfy.json');
    break;

  case 'addTrack':
  let album = process.argv[3];
  let tituloTrack = process.argv[4];
  let duracion = parseInt(process.argv[5]);
  let genero = process.argv[6];
  unqfy.addTrack(album,{name:tituloTrack,duration:duracion, genres: genero});
  saveUNQfy(unqfy, 'unqfy.json');
  break;

  case 'addPlaylist':
  let nombrePlayList = process.argv[3];
  let duracionMax = parseInt(process.argv[4]);
  let generos = process.argv.slice(5)
  unqfy.addPlaylist(nombrePlayList,generos,duracionMax);
  saveUNQfy(unqfy, 'unqfy.json');
  break;

  case 'getArtistByName':
  let nombreArtista = process.argv[3];
  console.log(unqfy.getArtistByName(nombreArtista));
  break;

  case  'getAlbumByName':
  let nombreAlbum = process.argv[3];
  console.log(unqfy.getAlbumByName(nombreAlbum));
  break;

  case 'getTrackByName':
  let nombreDeTrack = process.argv[3];
  console.log(unqfy.getTrackByName(nombreDeTrack));
  break;

  case 'getPlaylistByName':
  let playListName = process.argv[3];
  console.log(unqfy.getPlaylistByName(playListName));
  break;

  }
}

main();



