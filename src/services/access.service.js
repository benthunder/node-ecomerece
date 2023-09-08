const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const tokenModel = require("../models/token.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { ForbiddenRequestError } = require("../utils/reponse-error.util");
const { generateUserToken } = require("../helpers/token.helper");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    signUp = async ({ name, email, password }) => {
        const holderUser = await userService.findUserByEmail(email);

        if (holderUser) {
            throw new ForbiddenRequestError("Shop already exits");
        }

        const pwHash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            password: pwHash,
            roles: [RoleShop.SHOP],
        });

        if (!newUser) {
            throw new ForbiddenRequestError("Shop can not register");
        }

        const userToken = await generateUserToken({
            user_id: newUser._id,
            email: email,
        });

        const newToken = await tokenModel.create({
            user: newUser._id,
            public_key: userToken.publicKey,
            private_key: userToken.privateKey,
            token: userToken.token,
            refresh_token: userToken.refreshToken,
        });

        return { user: newUser, token: userToken };
    };

    signIn = async ({ email, password }) => {
        const holderUser = await userService.findUserByEmail(email);
        if (!holderUser) {
            throw new ForbiddenRequestError("User not existed");
        }

        const match = await bcrypt.compare(password, holderUser.password);
        if (!match) {
            throw new ForbiddenRequestError("Password not match");
        }

        const userToken = await generateUserToken({
            user_id: holderUser._id,
            email: email,
        });

        await tokenModel.findOneAndUpdate(
            { user: holderUser._id },
            {
                $set: {
                    user_id: holderUser._id,
                    public_key: userToken.publicKey,
                    token: userToken.token,
                    refresh_token: userToken.refreshToken,
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        return { user: holderUser, token: userToken };
    };

    logOut = async (token) => {
        const delToken = await tokenModel.findByIdAndDelete(token._id);

        return {
            user: delToken.user,
        };
    };

    refreshToken = async (token) => {
        if (!token.is_refresh) {
            throw new ForbiddenRequestError("Invalid refresh token");
        }

        const holderUser = await userModel.findById(token.user);

        const userToken = await generateUserToken({
            user_id: holderUser._id,
            email: holderUser.email,
        });

        await tokenModel.findOneAndUpdate(
            { user: holderUser._id },
            {
                $set: {
                    user_id: holderUser._id,
                    public_key: userToken.publicKey,
                    token: userToken.token,
                    refresh_token: token.refreshToken,
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        return { user: holderUser, token: userToken };
    };
}

module.exports = new AccessService();
