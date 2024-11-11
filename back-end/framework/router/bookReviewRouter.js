import express from 'express';

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

// middleware imports
import { authenticate } from '../middleware/authentication.js';
import { errorHandler } from '../middleware/error.js';
import { errorLogger } from '../middleware/logger.js';
import { eventLogger } from '../middleware/logger.js';

router.post('/', authenticate, bookReviewController.createBookReview);
router.get('/:id', authenticate, bookReviewController.getBookReview);
router.get('/', authenticate, bookReviewController.getAllBookReviews);
router.get('/random', authenticate, bookReviewController.getRandomBookReview);
router.get('/random/:quantity', authenticate, bookReviewController.getRandomBookReviews);
router.put('/:id', authenticate, bookReviewController.updateBookReview);
router.delete('/:id', authenticate, bookReviewController.deleteBookReview);
router.get('/filter', authenticate, bookReviewController.filterBookReviews);
router.get('/sort', authenticate, bookReviewController.sortBookReviews);
router.get('/search', authenticate, bookReviewController.searchBookReviews);

router.use(errorHandler);

export default router;