class Observable{
    constructor(){
        this.listeners=[];
    }
    change(subject, data){
        const listeners= this.listeners[subject] || [];
        listeners.forEach((listeners)=>{
            listeners.update(subject,data)
        });
    }
    addListeners(subject, listener){
        if(!(subject.includes(this.listeners))){
            this.listeners[subject]=[];
        
        }
        this.listeners[subject].push(listener)
    }

}
module.exports={
    Observable
}