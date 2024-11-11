import { UseCaseError } from "../../utility/error.js";

export function makeGetRandomBookReviews({ dbRepository }) {
    return async function getRandomBookReviews(amount = 5) {
        try {
            const randomBookReviews = await dbRepository.random(amount);
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