import express from 'express';

// middleware imports
import { authenticate } from '../middleware/authentication.js';
import { errorHandler } from '../middleware/error.js';
import { errorLogger } from '../middleware/logger.js';
import { eventLogger } from '../middleware/logger.js';

// dbRepository import (infrastructure layer)
import { dbRepository } from '../repository/dbRepository.js';

// use-case imports (application layer)
import makeUseCase from '../../use-case/use-cases.js';

const useCases = {
    createBookReview: makeUseCase.makeCreateBookReview({ dbRepository }),
    getAllBookReviews: makeUseCase.makeGetAllBookReviews({ dbRepository }),
    getBookReview: makeUseCase.makeGetBookReview({ dbRepository }),
    getRandomBookReview: makeUseCase.makeGetRandomBookReview({ dbRepository }),
    getRandomBookReviews: makeUseCase.makeGetRandomBookReviews({ dbRepository }),
    updateBookReview: makeUseCase.makeUpdateBookReview({ dbRepository }),
    deleteBookReview: makeUseCase.makeDeleteBookReview({ dbRepository }),
    filterBookReviews: makeUseCase.makeFilterBookReviews({ dbRepository }),
    sortBookReviews: makeUseCase.makeSortBookReviews({ dbRepository }),
    searchBookReviews: makeUseCase.makeSearchBookReviews({ dbRepository })
}

// controller import (presentation layer)
import { makeBookReviewController } from '../../controller/bookReviewController.js';

const bookReviewController = makeBookReviewController(useCases);


const router = express.Router();

router.post('/', bookReviewController.createBookReview);
router.get('/review/:id', bookReviewController.getBookReview);
router.get('/reviews', bookReviewController.getAllBookReviews);
router.get('/random', bookReviewController.getRandomBookReview);
router.get('/random/:quantity', bookReviewController.getRandomBookReviews);
router.put('/:id', bookReviewController.updateBookReview);
router.delete('/id', bookReviewController.deleteBookReview);
router.get('/filter', bookReviewController.filterBookReviews);
router.get('/sort', bookReviewController.sortBookReviews);
router.get('/search', bookReviewController.searchBookReviews);

export default router;