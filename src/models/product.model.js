"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            require: true,
        },
        product_description: {
            type: String,
        },
        product_thumb: {
            type: String,
            require: true,
        },
        product_quantity: {
            type: Number,
            require: true,
        },
        product_type: {
            type: String,
            require: true,
            enum: ["Clothing", "Electronic"],
        },
        product_user: {
            type: Types.ObjectId,
            require: true,
            ref: "User",
        },
        product_attributes: {
            type: Schema.Types.Mixed,
            require: true,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

const clothingSchema = new Schema(
    {
        brand: {
            type: String,
            require: true,
        },
        size: {
            type: String,
            require: true,
        },
        material: {
            type: String,
            require: String,
        },
    },
    { collection: "Clothes", timestamps: true }
);

const electronicSchema = new Schema(
    {
        manufacture: {
            type: String,
            require: true,
        },
        model: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            require: String,
        },
    },
    { collection: "Electronics", timestamps: true }
);

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model("Clothes", clothingSchema),
    electronic: model("Electronics", electronicSchema),
};
