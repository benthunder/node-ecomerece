const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateUserToken = async (payload) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096, // Key size (in bits)
        publicKeyEncoding: {
            type: "spki",
            format: "pem", // Output format
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem", // Output format
        },
    });

    const token = await jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "1d",
    });
    const refreshToken = await jwt.sign(
        { ...payload, is_refresh: true },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "7d",
        }
    );

    return {
        publicKey: publicKey,
        privateKey: privateKey,
        token: token,
        refreshToken: refreshToken,
    };
};

module.exports = {
    generateUserToken,
};
