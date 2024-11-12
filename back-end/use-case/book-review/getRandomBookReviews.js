import { UseCaseError } from "../../utility/error.js";

export function makeGetRandomBookReviews({ dbRepository }) {
    return async function getRandomBookReviews({quantity = 5}) {
        try {
            const randomBookReviews = await dbRepository.random(parseInt(quantity));
            return randomBookReviews;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get random Book Reviews.',
                status: error.status || 500,
                error
            });
        }
    } 
}