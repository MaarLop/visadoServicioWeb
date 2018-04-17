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
    cortarPorDuracion(){
        let maxDur= this.duration;
        let tr=[];
        this.tracks.forEach ((t)=>{
            if (maxDur>0){
                this.tr.push(t);
                maxDur-tr.duration;
            }
        });
    }
}
module.export={
    PlayList
};