const AccessService = require("../services/access.service");
const { CREATED, OK } = require("../utils/reponse-success.util");

class AccessController {
    static signUp = async (req, res, next) => {
        return await new CREATED({
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };

    static signIn = async (req, res, next) => {
        return await new CREATED({
            metadata: await AccessService.signIn(req.body),
        }).send(res);
    };

    static logOut = async (req, res, next) => {
        return await new OK({
            metadata: await AccessService.logOut(req.token),
        }).send(res);
    };

    static refreshToken = async (req, res, next) => {
        return await new OK({
            metadata: await AccessService.refreshToken(req.token),
        }).send(res);
    };
}

module.exports = AccessController;
