class Artista{
    
  constructor (nombre, pais){
    this.name = nombre;
    this.albumes = [];
    this.country = pais;
  }

  getName(){
    return this.name;
  }

  getAlbumes(){
    return this.albumes;
  }

  addAnAlbum(album){
    this.albumes.push(album);
  }

  haveAlbumWithName(nombre){
    return this.albumes.some(function(al){
        return( al.name === nombre);
    })
  }
  albumConNombre(nombre){
    return this.albumes.find((al)=>{
      return al.name === nombre;
    })
  }
  haveTrackWith(name){
    return this.albumes.some(function(alb){
      return alb.haveTrack(name);
    });
  }
  getTrackWith(titulo){
    let albumFound= this.albumes.find((al)=>{
      return al.getTrackWithName(titulo);
    });
    return albumFound.getTrackWithName(titulo);
  }
}
module.exports = {
  Artista,
};