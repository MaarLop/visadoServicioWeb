class User {
    constructor(email){
        this.email= email;
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
        let index= this.suscripciones.indexOf(artist);
        try{
            if (!this.hasAnArtistInList(artist)){
                throw new Error('No se encuentra suscripto al artista')
            }
            else
            {
                delete this.suscripciones[index]
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    hasAnArtistInList(artist){
        return this.suscripciones.some(function(art){
            return art.id === artist.id;
        })
    }
}

module.exports ={
    User
}