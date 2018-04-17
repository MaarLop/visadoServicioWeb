class Artista{
    
  constructor (nombre, pais){
    this.name = nombre;
    this.albumes = [];
    this.country = pais;
  }
  addAnAlbum(album){
    this.albumes.push(album);
  }
  haveAlbum(album){
    return this.albumes.includes(album);
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
  haveAlbumWith(name){
    return this.albumes.some(function(alb){
      return alb.haveTrack(name);
    });
  }
  getTrackWith(name){
    return this.albumes.find((al)=>{
      return al.getTrackWithName(name);
    });
  }
}
module.exports = {
  Artista,
};