class Album{

  constructor (title,year){
    this.name= title;
    this.year= year;
    this.artist;
  }
  associateArtist(artista){
    this.artist= artista;
  }
}

module.exports = {
    Album,
  };