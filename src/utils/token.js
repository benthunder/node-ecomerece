const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateUserToken = async (payload) => {
    const privateKey = await fs.readFile("../../token-private-key");
    const publicKey = crypto
        .createPublicKey({ key: privateKey, format: "pem", type: "pkcs1" })
        .export({ format: "pem", type: "spki" });

    const token = await jwt.sign(payload, privateKey, { algorithm: "RS256" });
    const refreshToken = await jwt.sign(payload, privateKey, {
        algorithm: "RS256",
    });

    return {
        publicKey: publicKey,
        token: token,
        refreshToken: refreshToken,
    };
};

module.exports = {
    generateUserToken,
};
