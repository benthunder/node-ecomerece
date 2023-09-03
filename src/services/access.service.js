const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { createUserToken, generateUserToken } = require("../utils/token");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    constructor() {}

    signUp = async (name, email, password) => {
        const holderUser = await userService.findUserByEmail(email);

        if (holderUser) {
        }

        const pwHash = await bcrypt.hash(password, 16);
        const newUser = await userModel.create({
            name,
            email,
            password: pwHash,
            roles: [RoleShop.SHOP],
        });

        if (!newUser) {
        }

        const userToken = generateUserToken({ email, pwHash });
    };
}
