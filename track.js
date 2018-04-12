class Track{

    constructor (nombre, duracion, genero){
      this.name= nombre;
      this.duration= duracion;
      this.genero= genero;
      this.album;
    }
    associateAlbum(album){
      this.album= album;
    }
  }
  
  module.exports = {
      Track
    };