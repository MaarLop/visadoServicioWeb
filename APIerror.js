

class APIerror extends Error {
    constructor( statusCode, errorCode, message = null) {
    super(message );
    this.status = statusCode;
    this.errorCode = errorCode;
    }
}
class BadRequest extends APIerror{
    constructor(message=null){
        super(400, 'BAD REQUEST', message);
    }
}
 class RelatedResourceNotFoundError extends APIerror{
    constructor(message= null){
        super(404, 'RELATED RESOURCE NOT FOUND', message);
    }
 }
 class ResourceAlreadyExists extends APIerror{
     constructor(message=null){
         super(409, 'RESOURCE ALREADY EXISTS', message);
     }
 }
class InternalServerError extends APIerror{
    constructor(message=null){
        super(500,'INTERNAL SERVER ERROR', message );
    }
}

module.exports= {APIerror,BadRequest, RelatedResourceNotFoundError, ResourceAlreadyExists,
     InternalServerError };
