

class APIerror extends Error {
    constructor(name, statusCode, errorCode, message = null) {
    super(message || name);
    this.name = name;
    this.status = statusCode;
    this.errorCode = errorCode;
    }
}

/*class InvalidInputError extends APIError {
    constructor() {
    super('InvalidInputError', 400, 'INVALID_INPUT_DATA');
    }
}*/

class BadRequest extends APIerror{
    constructor(message=null){
        super(400, 'BAD REQUEST', message);
    }
}
 class NotFoundErrror extends APIerror{
     constructor(message=null){
         super(404, 'RESOURCE NOT FOUND', message);
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

module.exports= {APIerror,BadRequest, NotFoundErrror, RelatedResourceNotFoundError, ResourceAlreadyExists,
     InternalServerError };