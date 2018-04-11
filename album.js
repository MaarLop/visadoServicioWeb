class Album{

  constructor (title,year){
    this.albumName= title;
    this.albumYear= year;
    this.artist;
  }
  associateArtist(artistName){
    this.artist= artistName;
  }
}
module.exports = {
    Album,
  };