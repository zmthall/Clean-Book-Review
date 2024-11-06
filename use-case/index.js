// use-case/index.js
import { makeCreateBookReview } from "./createBookReview.js";
import { makeGetBookReview } from "./getBookReview.js";
import { makeGetAllBookReviews } from "./getAllBookReviews.js";
import { makeGetRandomBookReview } from "./getRandomBookReview.js";
import { makeGetRandomBookReviews } from "./getRandomBookReviews.js";
import { makeUpdateBookReview } from "./updateBookReview.js";
import { makeDeleteBookReview } from "./deleteBookReview.js";
import { makeFilterBookReviews } from "./filterBookReviews.js";
import { makeSearchBookReviews } from "./searchBookReviews.js";
import { makeSortBookReviews } from "./sortBookReviews.js";

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