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
    
        // if (artId.includes(this.subcripciones)){
        //     if(!this.subcripciones[artId].includes(email)){
        //         this.subcripciones[artId].push(email);
        //         console.log("se agrego")
        //     }
            
        // }
        // else{
        //     this.subcripciones[artId]= [email.toLowerCase()];
        // }
    }

    unsubscribe(artId, email){
        if(artId.includes(this.subcripciones)){
            const index= this.subcripciones[artId].findIndex(email);
            if(index != -1){
                this.subcripciones.get(artId).delete([index]);
            }
        }
        
    }
    notify(artId,subject, menssage, from){
        
        let artId= this.subcripciones.includes(artId);
        try{
            if(!artId){
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
        return this.subcripciones.get(id)
    }

    deleteSuscribes(artId){
        this.subcripciones.get(artId) =[];
    }
}
module.exports={
    Notificador
}