import { UseCaseError } from "../../utility/error";

export function makeDeleteBookReview({ dbRepository }) {
    return async function deleteBookReview(id) {
        try {
            const deletedBookReview = await dbRepository.delete(id);
            return deletedBookReview;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to delete Book Review.',
                status: error.status || 500,
                error
            });
        }
    }
}