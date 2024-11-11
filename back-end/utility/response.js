import { BookReview } from "../entity/bookReview.js";
import { RepositoryError } from "./error.js";

export async function handleControllerResponse(controllerFunc, req, res) {
    try {
        const result = await controllerFunc(req);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ success: false, data: error.message });
    }
}

export async function handleQueryResponse(queryFunc, statement, valuesArr) {
    try {
        const result = await queryFunc(statement, valuesArr);
        if(result) {
            if(Array.isArray(result)) {
                try {
                    return result.map(rawBookReview => new BookReview(rawBookReview));
                } catch {
                    return result;
                } 
            } else {
                try {
                    return new BookReview(result);
                } catch {
                    return result;
                }
            }
        } else throw new RepositoryError('Failed to return query response BookReview.');
    } catch (error) {
        console.error(error)
        throw new RepositoryError({
            message: 'Failed to query from database.', 
            status: error.status || 500,
            error
        });
    }
}

export async function handleRepoReponse(repoFunc) {
    try {
        const result = await repoFunc();
        return {success: true, status: 200, data: result};
    } catch (error) {
        console.error(error);
        throw new RepositoryError({
            message: 'Failed to return dbQueryResult in repository response.', 
            status: error.status || 500,
            error
        });
    }
}