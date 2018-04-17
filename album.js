class Album{

  constructor (title,year){
    this.name= title;
    this.year= year;
    this.artist;
    this.tracks=[];
  }
 
  associateArtist(artista){
    this.artist= artista;
  }

  addATrack(track){
    this.tracks.push(track);
  }
}

module.exports = {
  Album,
};