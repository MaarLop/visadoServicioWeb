class Track{

    constructor (nombre, duracion, gen){
      this.name= nombre;
      this.duration= duracion;
      this.genres= gen;
      this.album;
    }
    associateAlbum(alb){
      this.album= alb;
    }
  }
  
  module.exports = {
      Track
    };