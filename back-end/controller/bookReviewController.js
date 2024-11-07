import { handleControllerResponse } from "../utility/response"

export function makeBookReviewController({ createBookReview, getAllBookReviews, getBookReview, getRandomBookReviews, getRandomBookReivew, updateBookReview, deleteBookReview, filterBookReviews, sortBookReviews, searchBookReviews }) {
    return {
        createBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await createBookReview(req.body);
        },req, res),
        getAllBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await getAllBookReviews();
        },req, res),
        getBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await getBookReview(req.params);
        },req, res),
        getRandomBookReivews: async (req, res) => handleControllerResponse(async (req) => {
            return await getRandomBookReviews();
        },req, res),
        getRandomBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await getRandomBookReivew();
        },req, res),
        updateBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await updateBookReview(req.params);
        },req, res),
        deleteBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await deleteBookReview(req.pararms);
        },req, res),
        filterBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await filterBookReviews(req.params);
        },req, res),
        sortBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await sortBookReviews(req.params);
        },req, res),
        searchBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await sortBookReviews(req.params);
        },req, res)
    }
}