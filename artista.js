class Artista{
    
  constructor (nombre, pais, _id){
    this.name = nombre;
    this.id= _id
    this.albumes = [];
    this.country = pais;
  }
toJson(){
  let albs= [];
  this.albumes.forEach((a)=>{
    let title= a.getTitle();
    albs.push(title);
  });
  return{nombre: this.name, country: this.country, id: this.id, albums: albs}
}
  getId(){
    return this.id;
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