class Observable{
    constructor(){
        this.listeners={};
    }
    change(subject, data){
        const lis= this.listeners[subject] || [];
        lis.forEach((listener)=>{
            listener.update(subject,data)
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