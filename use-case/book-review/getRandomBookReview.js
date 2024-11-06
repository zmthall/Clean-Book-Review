import { UseCaseError } from "../../utility/error";

export function makeGetRandomBookReview({ dbRepository }) {
    return async function getRandomBookReview() {
        try {
            const randomBookReview = await dbRepository.random(1);
            return randomBookReview;
        } catch (error) {
            throw new UseCaseError({
                message: 'Failed to get the random Book Review.',
                status: error.status || 500,
                error
            });
        }
    } 
}