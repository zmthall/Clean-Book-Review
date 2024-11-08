import { create } from "domain";
import { EntityError } from "../utility/error.js";
import { isValidDate } from "../utility/validation.js";

export class BookReview {
    constructor({id, title, author, isbn, genre, rating, read_date, summary, review, note = null, creation_date = null}) {
        // construct all necessary components of a BookReview from the title to the review all variables are 
        // validated through a validation function for contained self validation.

        if(creation_date === null) {
            creation_date = new Date();
            creation_date = creation_date.toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
        }
        if(this.validateID(id)) this.id = id;
        if(this.validateTitle(title)) this.title = title;
        if(this.validateAuthor(author)) this.author = author;
        if(this.validateISBN(isbn)) this.isbn = isbn;
        if(this.validateGenre(genre)) this.genre = genre;
        if(this.validateRating(rating)) this.rating = rating;
        if(this.validateReadDate(creation_date)) this.read_date = read_date;
        if(this.validateSummary(summary)) this.summary = summary;
        if(this.validateReview(review)) this.review = review;
        if(this.validateNote(note)) this.note = note;
        if(this.validateCreationDate(creation_date)) this.creation_date = creation_date;

        // console.log(this.id)
    }

    validateID(id) {
        // An id needs to be a number
        // An id cannot be empty
        if(!(typeof id === 'number' && !isNaN(id) && id >= 0))
            throw new EntityError('ID needs to be of type number, and it must be a positive integer.')

        return true;
    }

    validateTitle(title) {
        // A title needs to be a string
        // A title cannot be empty and needs to be between 5 and 250 characters
        if(!(typeof title === 'string' && title.length >= 5 && title.length <= 250))
            throw new EntityError('Title needs to be of type string, and it needs to be between 5 and 250 characters in length.'); // specific error thrown

        return true;
    }

    validateAuthor(author) {
        // An author needs to be a string
        // An author cannot be empty and needs to be between 10 and 250 characters
        if(!(typeof author === 'string' && author.length >= 10 && author.length <= 100))
            throw new EntityError('Author needs to be of type string and it needs to be between 10 and 100 characters in length.');

        return true;
    }

    validateISBN(isbn) {
        // An isbn needs to be a string
        // An isbn cannot be empty
        if(!(typeof isbn === 'string' && isbn.length !== 0))
            throw new EntityError('ISBN needs to be of type string and it cannot be empty.');

        return true;
    }

    validateGenre(genre) {
        // Genre needs to be a string
        // Genre cannot be empty and it needs to be between 10 and 200 characters
        if(!(typeof genre === 'string' && genre.length >= 10 && genre.length <= 200))
            throw new EntityError('Genre needs to be of type string and it needs to be between 10 and 200 characters in length.');

        return true;
    }

    validateRating(rating) {
        // Rating needs to be a number
        // Rating cannot a non number defined variable or null or undefined
        // A rating needs to be between the values of 0 and 10
        if(!(typeof rating === 'number' && !isNaN(rating) && rating >= 0 && rating <= 10))
            throw new EntityError('Rating needs to be of type number and it needs to be between 0 and 10.');

        return true;
    }

    validateReadDate(read_date) {
        // The read_date needs to be a string
        // The read_date must be a valide date in format and accurate/real
        if(!(typeof read_date === 'string' && isValidDate(read_date)))
            throw new EntityError('Date needs to be of type string in MM/DD/YYYY or MM-DD-YYYY format and it needs to be a real date.');

        return true;
    }

    validateSummary(summary) {
        // A summary needs to be a string
        // A summary needs to be between 200 and 1000 characters
        if(!(typeof summary === 'string' && summary.length >= 200 && summary.length <= 5000))
            throw new EntityError('Summary needs to be of type string and it needs to be between 200 and 1000 characters in length.');
        
        return true;
    }

    validateNote(note) {
        if(note === null) return true
        // A note needs to be a string
        // A note needs to be betewen 200 and 10000 characters
        if(!(typeof note === 'string' && note.length >= 200 && note.length <= 10000))
            throw new EntityError('Note needs to be of type string and it needs to be between 200 and 10000 characters in length.');
        
        return true;
    }

    validateReview(review) {
        // A review needs to be a string
        // A review needs to be between 100 and 500 characters
        if(!(typeof review === 'string' && review.length >= 100 && review.length <= 500))
            throw new EntityError('Review needs to be of type string and it needs to be between 100 and 500 characters in length.');

        return true;
    }

    validateCreationDate(creation_date) {
        // A Date needs to be a valid date
        if (!(typeof creation_date === 'string' && isValidDate(creation_date))) {
            throw new EntityError('Creation Date needs to be of type string in MM/DD/YYYY or MM-DD-YYYY format and it needs to be a real date.');
        }
        return true;
    }

    validateEditedData(newData) {
        const allowedKeys = ["title", "author", "isbn", "genre", "rating", "read_date", "summary", "note", "review"];

        // Check if all keys in newData are valid
        if (!Object.keys(newData).every(key => allowedKeys.includes(key)))
            throw new EntityError("When trying to a Book Review, newData contains invalid fields.");

        return true;
    }
    
    setEditDate() {
        this.edited_date = new Date();
    }
    
    organizeEditedData(newData) {
        if(this.validateEditedData(newData))
            return {
                ...this,
                ...newData,
                id: this.id,
                creation_date: this.creation_date
            };
    }

    edit(newData) {
        const editedBookReview = new BookReview(this.organizeEditedData(newData));
        editedBookReview.setEditDate();

        return editedBookReview;
    }

    get(key) {
        return this[key];
    }

    valuesArr() {
        return [
            this.id,
            this.title,
            this.author,
            this.isbn,
            this.genre,
            this.rating,
            this.read_date,
            this.summary,
            this.review,
            this.note,
            this.creation_date,
            this.edited_date || null
        ];
    }
}