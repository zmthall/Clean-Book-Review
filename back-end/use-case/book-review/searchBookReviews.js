import { UseCaseError } from "../../utility/error.js";

export function makeSearchBookReviews({ dbRepository }) {
    return async function searchBookReviews(params) {
        try {
            const searchResults = await dbRepository.find(params);
            return searchResults;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get Book Review(s) fulfilling search parameters.',
                status: error.status || 500,
                error
            });
        }
    } 
}