// use-case/index.js
import { makeCreateBookReview } from "./book-review/createBookReview.js";
import { makeGetBookReview } from "./book-review/getBookReview.js";
import { makeGetAllBookReviews } from "./book-review/getAllBookReviews.js";
import { makeGetRandomBookReview } from "./book-review/getRandomBookReview.js";
import { makeGetRandomBookReviews } from "./book-review/getRandomBookReviews.js";
import { makeUpdateBookReview } from "./book-review/updateBookReview.js";
import { makeDeleteBookReview } from "./book-review/deleteBookReview.js";
import { makeFilterBookReviews } from "./book-review/filterBookReviews.js";
import { makeSearchBookReviews } from "./book-review/searchBookReviews.js";
import { makeSortBookReviews } from "./book-review/sortBookReviews.js";

export default {
    makeCreateBookReview,
    makeGetBookReview,
    makeGetAllBookReviews,
    makeGetRandomBookReview,
    makeGetRandomBookReviews,
    makeUpdateBookReview,
    makeDeleteBookReview,
    makeFilterBookReviews,
    makeSearchBookReviews,
    makeSortBookReviews
};