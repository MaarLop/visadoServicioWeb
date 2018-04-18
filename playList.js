class PlayList{
    constructor (nombre, duracion, generos){
        this.playlistName = nombre;
        this.duration = duracion;
        this.generos = generos;
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
    getTracksDuration(){
        let d= 0;
        this.tracks.forEach((t)=>{
            return d+ t.duracion;
        })
        return d;
    }
}
module.export={
    PlayList
};