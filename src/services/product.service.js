"use strict";

const { product, electronic, clothing } = require("../models/product.model");
const { ForbiddenRequestError } = require("../utils/reponse-error.util");

class ProductFactory {
    static productRegistry = {};
    static registerProductType = (product_type, classRef) => {
        ProductFactory.productRegistry[product_type] = classRef;
    };
    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type];
        if (!type) {
            throw new ForbiddenRequestError(`Type ${type} not invalid`);
        }

        return new productClass(payload).createProduct();
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

    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id });
    }
}

class ProductClothing extends Product {
    async createProduct() {
        const newProductClothing = await clothing.create({
            ...this.product_attributes,
            product_user: this.product_user,
        });

        if (!newProductClothing) {
            throw new ForbiddenRequestError(
                "Error create new Product Clothing"
            );
        }

        const newProduct = super.createProduct(newProductClothing._id);
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
        const newProductElectronic = await electronic.create({
            ...this.product_attributes,
            product_user: this.product_user,
        });

        if (!newProductElectronic) {
            throw new ForbiddenRequestError(
                "Error create new Product Electronic"
            );
        }

        const newProduct = super.createProduct(newProductElectronic._id);
        if (!newProduct) {
            throw new ForbiddenRequestError(
                "Error create new Product Electronic"
            );
        }

        return newProduct;
    }
}

ProductFactory.registerProductType("Electronic", ProductElectronic);
ProductFactory.registerProductType("Clothing", ProductClothing);

module.exports = ProductFactory;
