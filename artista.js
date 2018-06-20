class Artista{
    
  constructor (_id,nombre, pais){
    this.id= parseInt (_id)
    this.name = nombre;
    this.albums = [];
    this.country = pais;
  }
toJson(){
  let albs= [];
  this.albums.forEach((a)=>{
    let albumjson= a.toJson() ;
    albs.push(albumjson);
  });
  return{id: this.id, name: this.name, albums: albs, country: this.country}
}
  getId(){
    return this.id;
  }

  getAlbumesJson(){
    let jsonlist= []
    if (this.albums.length >0){
      this.albums.forEach ((a)=>{
        jsonlist.push (a.toJson())
      })
    }
      return jsonlist;
  }

  getName(){
    return this.name;
  }

  getAlbumes(){
    return this.albums;
  }

  addAnAlbum(album){
    this.albums.push(album);
  }

  haveAlbumWithName(nombre){
    return this.albums.some(function(al){
        return( al.name === nombre);
    })
  }
  hasAlbumWithPartOfTitle(title){
    return this.albums.some(function (a){
      return a.name.includes (title)
    })
  }

  haveAnAlbumWithId(id){
    return this.albums.some (function (album){
      return album.getId() === id
    })
  }

  albumConNombre(nombre){
    return this.albums.find((al)=>{
      return al.name === nombre;
    })
  }

  getAlbumWithId(nro_id){
    return this.albums.find ((album)=>{
      return album.getId() === id
    })
  }

  getAlbumWithMatchTitle(name){
    let al= this.albums.find ((album)=>{
      return album.name.includes(name)
    })
    return al;
  }

   haveTrackWith(name){
    return this.albums.some(function(alb){
      return alb.haveTrack(name);
    });
  }

  getTrackWith(titulo){
    let albumFound= this.albums.find((al)=>{
      return al.getTrackWithName(titulo);
    });
    return albumFound.getTrackWithName(titulo);
  }
  deleteAlbum(_id){
    this.albums= this.albums.filter((al)=>{
      return al.id != _id
    })
  }

  itHasName(part_name){
    return this.name.search(part_name)
  }

}
module.exports = {
  Artista,
};