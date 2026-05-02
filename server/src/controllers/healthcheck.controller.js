import { ApiResponse } from '../utils/ApiResponse.js';

const healthcheck = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, 'OK', 'Health check passed'));
};

export { healthcheck };
