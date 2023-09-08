const tokenModel = require("../models/token.model");
const { Types } = require("mongoose");
class tokenService {
    findByUserId = async (userId) => {
        const token = await tokenModel
            .findOne({ user: new Types.ObjectId(userId) })
            .lean();

        return token;
    };
}

module.exports = new tokenService();
