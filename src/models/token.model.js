const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Token";
const COLLECTION_NAME = "Tokens";

const tokenSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: "User",
        },
        public_key: {
            type: String,
            required: true,
            unique: true,
        },
        token: {
            type: String,
            require: true,
            unique: true,
        },
        refresh_token: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true, COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, tokenSchema);
