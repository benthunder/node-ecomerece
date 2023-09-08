const tokenService = require("../services/token.service");
const jwt = require("jsonwebtoken");
const { ForbiddenRequestError } = require("../utils/reponse-error.util");

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATIION: "authorization",
    CLIENT_ID: "x-client-id",
};

const authentication = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];

    if (!userId) throw new ForbiddenRequestError("User ID not found");

    const token = await tokenService.findByUserId(userId);

    if (!token) throw new ForbiddenRequestError("Invalid token");

    const accessToken = req.headers[HEADER.AUTHORIZATIION];
    if (!accessToken) throw new ForbiddenRequestError("Token not found");

    const decodeToken = jwt.verify(accessToken, token.public_key);

    if (userId !== decodeToken.user_id)
        throw new ForbiddenRequestError("Invalid user");

    req.token = token;

    req.token.is_refresh = false;
    if (decodeToken.is_refresh) {
        req.token.is_refresh = true;
    }

    return next();
};

module.exports = {
    authentication,
};
