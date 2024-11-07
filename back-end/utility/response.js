export async function handleControllerResponse(controllerFunc, req, res) {
    try {
        const result = await controllerFunc(req);
        res.status(result.status || 200).json(successResponse(result));
    } catch (error) {
        console.error(error.message);
        res.status(error.status || 500).json({ success: false, data: error.message });
    }
}