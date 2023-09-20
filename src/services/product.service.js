"use strict";

const { product, electronic, clothing } = require("../models/product.model");
const { ForbiddenRequestError } = require("../utils/reponse-error.util");

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case "Electronic":
                return new ProductElectronic(payload).createProduct();

            case "Clothing":
                return new ProductClothing(payload).createProduct();

            default:
                throw new ForbiddenRequestError(
                    `Error create new Product ${type}`
                );
        }
    }
}

class Product {
    constructor({
        product_name,
        product_description,
        product_thumb,
        product_quantity,
        product_type,
        product_user,
        product_attributes,
    }) {
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_thumb = product_thumb;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_user = product_user;
        this.product_attributes = product_attributes;
    }

    async createProduct() {
        return await product.create(this);
    }
}

class ProductClothing extends Product {
    async createProduct() {
        const newProductClothing = await clothing.create(
            this.product_attributes
        );

        if (!newProductClothing) {
            throw new ForbiddenRequestError(
                "Error create new Product Clothing"
            );
        }

        const newProduct = super.createProduct();
        if (!newProduct) {
            throw new ForbiddenRequestError(
                "Error create new Product Clothing"
            );
        }

        return newProduct;
    }
}

class ProductElectronic extends Product {
    async createProduct() {
        const newProductElectronic = await electronic.create(
            this.product_attributes
        );

        if (!newProductElectronic) {
            throw new ForbiddenRequestError(
                "Error create new Product Electronic"
            );
        }

        const newProduct = super.createProduct();
        if (!newProduct) {
            throw new ForbiddenRequestError(
                "Error create new Product Electronic"
            );
        }

        return newProduct;
    }
}

module.exports = ProductFactory;
