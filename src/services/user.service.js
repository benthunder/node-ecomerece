const userModel = require("../models/user.model");

class UserService {
    findUserByEmail = async (email) => {
        return await userModel.findOne({ email: email }).lean();
    };
}

module.exports = new UserService();
