class Track{

    constructor (nombre, duracion, genres){
      this.name= nombre;
      this.duration= duracion;
      this.genres= genres;
      this.album;
    }
    associateAlbum(album){
      this.album= album;
    }
  }
  
  module.exports = {
      Track
    };