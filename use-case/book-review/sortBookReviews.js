import { UseCaseError } from "../../utility/error";

export function makeSortBookReviews({ dbRepository }) {
    return async function sortBookReviews(params) {
        try {
            const sortedResults = await dbRepository.sort(params);
            return sortedResults;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get Book Reviews fulfilling sort parameters.',
                status: error.status || 500,
                error
            });
        }
    } 
}