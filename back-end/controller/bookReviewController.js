import { handleControllerResponse } from "../utility/response.js";

export function makeBookReviewController({ createBookReview, getAllBookReviews, getBookReview, getRandomBookReview, getRandomBookReviews, updateBookReview, deleteBookReview, filterBookReviews, sortBookReviews, searchBookReviews }) {
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
        getRandomBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await getRandomBookReview();
        },req, res),
        getRandomBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await getRandomBookReviews(req.params);
        },req, res),
        updateBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await updateBookReview(req.params, { newData: req.body });
        },req, res),
        deleteBookReview: async (req, res) => handleControllerResponse(async (req) => {
            return await deleteBookReview(req.params);
        },req, res),
        filterBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await filterBookReviews(req.params);
        },req, res),
        sortBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await sortBookReviews(req.params);
        },req, res),
        searchBookReviews: async (req, res) => handleControllerResponse(async (req) => {
            return await searchBookReviews(req.params);
        },req, res)
    }
}