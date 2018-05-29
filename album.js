class Album{

  constructor (title,year){
    this.name= title;
    this.year= year;
    this.artist;
    this.tracks=[];
  }
  toJson(){
    return {nombre: this.name, year: this.year}
  }
  getArtistName(){
    return this.artist.getName();
  }

  getTracks(){
    return this.tracks;
  }
  
  associateArtist(artista){
    this.artist= artista;
  }

  addATrack(track){
    this.tracks.push(track);
  }
  haveTrack(name){
    return this.tracks.some(function(track){
      return track.name===name;
    });
  }
  getTrackWithName(titulo){
    return this.tracks.find((t)=>{
      return t.name===titulo;
    });
  }
}

module.exports = {
  Album,
};