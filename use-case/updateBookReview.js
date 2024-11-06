import { UseCaseError } from "../utility/error";

export function makeUpdateBookReview({ dbRepository }) {
    return async function updateBookReview(id, newData) {
        try {
            const updatedBookReview = await dbRepository.update(id, newData);
            return updatedBookReview;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to update Book Review.',
                status: error.status || 500,
                error
            });
        }
    }
}