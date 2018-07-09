const sendMmail = require('./sendMail');

class Notificador{
    constructor(){
        this.subcripciones=new Map();
    }
    subscribe(artId,email){
        if (this.subcripciones.has(artId)){
            if (! this.subcripciones.get(artId).includes(email)){
                this.subcripciones.get(artId).push(email);
                console.log("se agrego") 
                
            }
        }
        else{
            this.subcripciones.set(artId, [email])
            console.log("se agrego por primera vez")
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
        console.log(typeof artId)
        
        try{
            if(!this.subcripciones.has(artId)){
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
        this.subcripciones.delete(artId);
    }
}

module.exports={
    Notificador,

}