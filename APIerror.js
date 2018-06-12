

class APIerror extends Error {
    constructor( statusCode, errorCode, message = null) {
    super(message );
    this.status = statusCode;
    this.errorCode = errorCode;
    }
}
class BadRequest extends APIerror{
    constructor(message=null){
        super(400, 'BAD_REQUEST', message);
    }
}
 class RelatedResourceNotFoundError extends APIerror{
    constructor(message= null){
        super(404, 'RELATED_RESOURCE_NOT_FOUND', message);
    }
 }
 class ResourceAlreadyExists extends APIerror{
     constructor(message=null){
         super(409, 'RESOURCE_ALREADY_EXISTS', message);
     }
 }
class InternalServerError extends APIerror{
    constructor(message=null){
        super(500,'INTERNAL_SERVER_ERROR', message );
    }
}

module.exports= {APIerror,BadRequest, RelatedResourceNotFoundError, ResourceAlreadyExists,
     InternalServerError };
