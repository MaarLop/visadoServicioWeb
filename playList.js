class PlayList{
    constructor (nombre, duracion, genero){
        this.playlistName = nombre;
        this.duration = duracion;
        this.genero = genero;
        this.tracks = [];
    }
    addTrack(track){
        this.tracks.push(track);
    }
}
module.export={
    PlayList
};