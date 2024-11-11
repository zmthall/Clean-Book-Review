// Define EntityError class to represent errors within the entity
export class EntityError extends Error {
    constructor(message) {
        super(message);
        this.errorType = 'EntityError'; // specific errortype variable to determine where error is located
        this.status = 400; // status for evenutal front end presentation
    }
}

export class UseCaseError extends Error {
    constructor({message, error, status = 500}) {
        super(message);
        this.errorType = 'UseCaseError';
        this.status = status;
        this.error = error ? error.message : null;
        this.stack = error ? error.stack : null;
    }
}

export class ControllerError extends Error {
    constructor({message, error, status = 403}) {
        super(message);
        this.errorType = 'ControllerError';
        this.status = status;
        this.error = error ? error.message : null;
        this.stack = error ? error.stack : null;
    }
}

export class RepositoryError extends Error {
    constructor({message, error, status = 500}) {
        super(message);
        this.errorType = 'RepositoryError';
        this.status = status;
        this.error = error ? error.message : null;
        this.stack = error ? error.stack : null;
    }
}