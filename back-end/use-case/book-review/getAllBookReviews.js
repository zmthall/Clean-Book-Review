import { UseCaseError } from "../../utility/error.js";

export function makeGetAllBookReviews({ dbRepository }) {
    return async function getAllBookReviews() {
        try {
            const allBookReviews = await dbRepository.getAll();
            return allBookReviews;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get Book Reviews.',
                status: error.status || 500,
                error
            });
        }
    }
}