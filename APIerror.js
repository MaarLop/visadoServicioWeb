class APIerror extends Error {
 constructor(status, errorCode, message){
     super(message||'status' $(status) || 'errorCode);
     this.status=status;
     this.errorCode= errorCode;
 }
}

 class NotFoundErrror extends APIerror(){
     constructor(message=null){
         super(404, 'RESOURCE NOT FOUND', message);
     }
 }
 class RelatedResourceNotFound extends APIerror(){
     
 }
