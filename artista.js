class Artista{
    
  constructor (nombre, pais){
    this.name = nombre;
    this.albumes = [];
    this.country = pais;
  }
  addAnAlbum(album){
    this.albumes.push(album);
  }
}
module.exports = {
  Artista,
};