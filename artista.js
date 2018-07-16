class Artista{
    
  constructor (_id,nombre, pais,tw){
    this.id= parseInt (_id)
    this.name = nombre;
    this.albums = [];
    this.country = pais;
    this.videos= []
    this.twitts;
  }
toJson(){
  let albs= [];
  this.albums.forEach((a)=>{
    let albumjson= a.toJson() ;
    albs.push(albumjson);
  });
  return {id: this.id, name: this.name, albums: albs, country: this.country}
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
  hasAlbumWithPartOfTitle(_name){
    return this.albums.some(function (a){
      let title= a.name.toLowerCase();
      return title.includes (_name.toLowerCase())
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

  getAlbumWithMatchTitle(_name){

    let al= this.albums.filter ((album)=>{
      let title= album.name.toLowerCase();
      return title.includes(_name.toLowerCase())
    })
     return al
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

  setVideos(lista){
    this.videos= lista
  }

  addTwitts(t){
    this.twitts=t
  }

  getTwitt(){
    return this.twitts
  }

}
module.exports = {
  Artista,
};