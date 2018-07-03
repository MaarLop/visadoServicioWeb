class User {
    constructor(email, name){
        this.email= email;
        this.name= name;
        this.suscripciones=[]
    }

    subscribe(artist){
        try{
            if (!this.suscripciones.includes(artist)){
                this.suscripciones.add(artist);
            }
            else{
                throw new Error(' ya se encuntra suscripto al artista')
            }
        }
        catch(e){
            console.log(e.message)
        }
        
    }

    unsubscribe(artist){
        try{
            if (!this.hasAnArtistInList(artist)){
                throw new Error('No se encuentra suscripto al artista')
            }
            else
            {
                let index= this.suscripciones.indexOf(artist);
                delete this.suscripciones[index]
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    hasAnArtistInList(artistid){
        return this.suscripciones.some(function(art){
            return art.id === artistid;
        })
    }
}

module.exports ={
    User
}