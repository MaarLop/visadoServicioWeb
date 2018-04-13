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
}

module.exports = {
  Album,
};