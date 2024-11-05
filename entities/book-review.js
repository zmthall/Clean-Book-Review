import { EntityError } from "../utility/error.js";
import { isValidDate } from "../utility/validation.js";

export class BookReview {
    constructor(title, author, isbn, genre, rating, readDate, summary, note, review) {
        // construct all neccessary components of a BookReview from the title to the review all variables are 
        // validated through a validation function for contained self validation.
        if(this.validate(title, author, isbn, genre, rating, readDate, summary, note, review)) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
            this.genre = genre;
            this.rating = rating;
            this.readDate = readDate;
            this.summary = summary;
            this.note = note;
            this.review = review;
        }
    }

    validate(title, author, isbn, rating, readDate, summary, note, review) {
        // A title needs to be a string
        // A title cannot be empty and needs to be between 10 and 250 characters
        if(!(typeof title === 'string' && title.length >= 10 && title.length <= 250))
            throw new EntityError('Title needs to be of type string, and it needs to be between 10 and 250 characters in length.'); // specific error thrown

        // An author needs to be a string
        // An author cannot be empty and needs to be between 10 and 250 characters
        if(!(typeof author === 'string' && author.length >= 10 && author.length <= 100))
            throw new EntityError('Author needs to be of type string and it needs to be between 10 and 100 characters in length.');

        // An isbn needs to be a string
        // An isbn cannot be empty
        if(!(typeof isbn === 'string' && isbn.length !== 0))
            throw new EntityError('ISBN needs to be of type string and it cannot be empty.');

        // Genre needs to be a string
        // Genre cannot be empty and it needs to be between 10 and 200 characters
        if(!(typeof genre === 'string' && genre.length >= 10 && genre.length <= 200))
            throw new EntityError('Genre needs to be of type string and it needs to be between 10 and 200 characters in length.');
        
        // Rating needs to be a number
        // Rating cannot a non number defined variable or null or undefined
        // A rating needs to be between the values of 0 and 10
        if(!(typeof rating === 'number' && rating !== null && rating !== undefined && rating != NaN && rating >= 0 && rating <= 10))
            throw new EntityError('Rating needs to be of type number and it needs to be between 0 and 10.');

        // The readDate needs to be a string
        // The readDate must be a valide date in format and accurate/real
        if(!(typeof readDate === 'string' && isValidDate(readDate)))
            throw new EntityError('Date needs to be of type string in MM/DD/YYYY or MM-DD-YYYY format and it needs to be a real date.');

        // A summary needs to be a string
        // A summary needs to be between 200 and 1000 characters
        if(!(typeof summary === 'string' && summary.length >= 200 && summary.length <= 1000))
            throw new EntityError('Summary needs to be of type string and it needs to be between 200 and 1000 characters in length.');

        // A note needs to be a string
        // A note needs to be betewen 200 and 10000 characters
        if(!(typeof note === 'string' && note.length >= 200 && note.length <= 10000))
            throw new EntityError('Note needs to be of type string and it needs to be between 200 and 10000 characters in length.');

        // A review needs to be a string
        // A review needs to be between 100 and 500 characters
        if(!(typeof review === 'string' && review.length >= 100 && review.length <= 500))
            throw new EntityError('Review needs to be of type string and it needs to be between 100 and 500 characters in length.');

        return true;
    }
}