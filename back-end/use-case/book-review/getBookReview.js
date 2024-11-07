import { UseCaseError } from "../../utility/error";

export function makeGetBookReview({ dbRepository }) {
    return async function getBookReview(id) {
        try {
            const bookReview = await dbRepository.get(id);
            return bookReview;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get the Book Review.',
                status: error.status || 500,
                error
            });
        }
    } 
}