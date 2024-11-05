// Define EntityError class to represent errors within the entity
export class EntityError extends Error {
    constructor(message) {
        super(message);
        this.errorType = 'EntityError'; // specific errortype variable to determine where error is located
        this.status = 400; // status for evenutal front end presentation
    }
}