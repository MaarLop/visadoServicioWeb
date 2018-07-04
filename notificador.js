const picklejs = require('./pickle.js');
const sendMmail = require('./sendMail');
const fs = require('fs');

class Notificador{
    constructor(){
        this.subcripciones=new Map();
        this.subcripcionesJson

    }
    subscribe(artId,email){
        if (this.subcripciones.has(artId)){
            if (! this.subcripciones.get(artId).includes(email)){
                this.subcripciones.get(artId).push(email);
                console.log("se agrego") 
                this.subcripcionesJson= this.map_to_object(this.subcripciones)  
            }
        }
        else{
            this.subcripciones.set(artId, [email])
            console.log("se agrego por primera vez")
            this.subcripcionesJson= this.map_to_object(this.subcripciones)
        }
    }

    unsubscribe(artId, email){
        if(this.subcripciones.has(artId)){
            const index= this.subcripciones.get(artId).indexOf(email);
            if(index >-1){
              this.subcripciones.get(artId).splice(index,1);
              console.log("dessuscripto")
            }
        }
    }
    notify(artId,subject, menssage, from){
        
        try{
            if(this.subcripciones.has(artId)){
                throw new Error('No existe el artista');
            }
            else{
                sendMmail.send(subject, menssage,from, this.subcripciones.get(artId));
            }
        }
        catch (e) 
        {
          console.log(e.message);
        }
    }

    getSuscriptions(artistId){
        return this.subcripciones.get(artistId)
    }

    deleteSuscribes(artId){
        this.subcripciones.set(artId,[]);
    }

    save(filename = 'notificador.json') {
        new picklejs.FileSerializer().serialize(filename, this);
      }
    
      static load(filename = 'notificador.json') {
        const fs = new picklejs.FileSerializer();
        const classes = [Notificador, Map];
        fs.registerClasses(...classes);
        return fs.load(filename);
      }

      map_to_object(map) {
        const out = Object.create(null)
        map.forEach((value, key) => {
          if (value instanceof Map) {
            out[key] = map_to_object(value)
          }
          else {
            out[key] = value
          }
        })
        return out
    }

}
function getNotificador(filename) {
    let notificador = new Notificador();
    if (fs.existsSync(filename)) {
      console.log();
      notificador = Notificador.load(filename);
    }
    return notificador;
  }

  function saveNotificador(notif, filename) {
    console.log();
    notif.save(filename);
    console.log(notif)
  }

module.exports={
    Notificador,
    getNotificador,
    saveNotificador
}