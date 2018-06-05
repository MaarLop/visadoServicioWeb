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
      if (this.lyric == null){
        this.lyric= musixmatchClient.getLyricTrack(this.getTitle(), this.album.getArtistName());
      }
      else{
        return this.lyric;
      }
    }
  }
  
  module.exports = {
      Track
    };