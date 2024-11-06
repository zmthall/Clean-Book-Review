import { UseCaseError } from "../../utility/error";

export function makeFilterBookReviews({ dbRepository }) {
    return async function filterBookReviews(params) {
        try {
            const filteredResults = await dbRepository.filter(params);
            return filteredResults;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get Book Review(s) fulfilling filter parameters.',
                status: error.status || 500,
                error
            });
        }
    }
}