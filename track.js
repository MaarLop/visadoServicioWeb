const musixmatchClient= require('./musixmatchClient');

class Track{

    constructor (nombre, duracion, gen){
      this.name= nombre;
      this.duration= duracion;
      this.genres= gen;
      this.album;
      this.lyric;
    }
    associateAlbum(alb){
      this.album= alb;
    }

    getTitle(){
      return this.name;
    }

    getLyric(){
        return this.lyric;
    }
    setlyric(str){
      this.lyric= str;
    }
  }
  
  module.exports = {
      Track
    };