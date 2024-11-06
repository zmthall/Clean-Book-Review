import { UseCaseError } from "../utility/error";

export function makeCreateBookReview({ dbRepository }) {
    return async function createBookReview(newBookReview) {
        try {
            const createdReview = await dbRepository.create(newBookReview);
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