import { UseCaseError } from "../../utility/error.js";
import { nanoid } from "nanoid";


export function makeCreateBookReview({ dbRepository }) {
    return async function createBookReview(bookReviewData) {
        bookReviewData.read_date = (new Date(bookReviewData.read_date)).toISOString()
        bookReviewData = {
            id: nanoid(),
            ...bookReviewData,
        };
        try {
            const createdReview = await dbRepository.create(bookReviewData);
            return createdReview;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to create Book Review.', 
                status: error.status || 500, 
                error
            });
        }
    }
}