class ErroresDeModelo {
  constructor(message) {
    this.message = message;
  }
}

class NoExisteArtista extends ErroresDeModelo {
  constructor() {
    super('No Existe El Artista');
  }
}

class YaExisteArtista extends ErroresDeModelo {
  constructor() {
    super('Ya existe el artista');
  }
}

class YaExisteTrack extends ErroresDeModelo {
  constructor() {
    super('Ya existe el track');
  }
}

class YaExisteAlbum extends ErroresDeModelo {
  constructor() {
    super('Ya existe el album');
  }
}

class YaExistePlaylist extends ErroresDeModelo {
  constructor() {
    super('Ya existe esa playlist');
  }
}

class NoExisteAlbum extends ErroresDeModelo {
  constructor() {
    super('No existe el album');
  }
}

class NoExisteTrack extends ErroresDeModelo {
  constructor() {
    super('No existe el track');
  }
}

class NoExistePlaylist extends ErroresDeModelo {
  constructor() {
    super('No existe la playlist');
  }
}
class NoExisteLyric extends ErroresDeModelo {
  constructor() {
    super('No existe lyric');
  }
}

module.exports = { NoExisteArtista, YaExisteArtista, ErroresDeModelo, YaExisteAlbum, YaExisteTrack, 
  YaExistePlaylist,NoExisteTrack,NoExistePlaylist,NoExisteLyric, NoExisteAlbum};