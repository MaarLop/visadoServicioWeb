class ErroresDeModelo{
    constructor(message) {
      this.message = message;
    }
  }

  class NoExisteArtista extends ErroresDeModelo{
    constructor() {
      super('No Existe El Artista');
    }
  }
  class YaExisteArtista extends ErroresDeModelo{
    constructor() {
        super('Ya existe el artista');
   }
  }
  class YaExisteTrack extends ErroresDeModelo{
    constructor() {
        super('Ya existe el track');
   }
  }
   class YaExisteAlbum extends ErroresDeModelo{
    constructor() {
        super('Ya existe el album');
   }

 }
    class NoExisteAlbum extends ErroresDeModelo{
        constructor() {
            super('No existe el album');
    }
}
 
  module.exports= {NoExisteArtista, YaExisteArtista, Errores,YaExisteAlbum, YaExisteTrack};