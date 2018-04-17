class Album{

  constructor (title,year){
    this.name= title;
    this.year= year;
    this.artist;
    this.tracks=[];
  }
 
  getArtistName(){
    return this.artist.name;
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
  getTrackWithName(name){
    return this.tracks.find((t)=>{
      return t.name===name;
    });
  }
}

module.exports = {
  Album,
};