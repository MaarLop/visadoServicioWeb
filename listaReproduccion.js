class ListaReproduccion {
    constructor (nombre, generos,  duracion){
        this.name = nombre;
        this.duration = duracion;
        this.generos = generos;
        this.tracks = [];
        this.tiempoRest= this.duration;
    }

    addTrack(track){
        if (!this.hasTrack(track) && this.restaTiempo(track.duration)){
           this.tracks.push(track);
           this.descontar(track.duration);
        }
    }

    restaTiempo(tiempo){
        return (parseInt(this.tiempoRestante())- parseInt(tiempo) )>= 0
    }

    descontar(tiempo){
         return this.tiempoRest= parseInt(this.tiempoRestante())- parseInt(tiempo);
    }

    addTracks(listTracks){
        listTracks.forEach((t)=>{
            this.addTrack(t);
        });
    }

    hasTrack(aTrack){
        return this.tracks.includes (aTrack);
    }


    tiempoRestante(){
        return this.tiempoRest;
    }
}
module.exports = {
    ListaReproduccion
}