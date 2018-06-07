class Album{

  constructor (title,year,_id){
    this.name = title;
    this.id = _id;
    this.year = year;
    this.artist;
    this.tracks =[];
  }
  toJson(){
  let tr= [];
  this.tracks.forEach((t)=>{
    let title= t.getTitle();
    tr.push(title);
  })
    return {nombre: this.name, year: this.year, tracks: tr}
  }

  getTitle(){
    return this.name;
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
    return this.getTracks().some(function(track){
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