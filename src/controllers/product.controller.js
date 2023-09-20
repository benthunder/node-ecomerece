const ProductService = require("../services/product.service");
const { CREATED, OK } = require("../utils/reponse-success.util");

class ProductController {
    static createProduct = async (req, res, next) => {
        return await new CREATED({
            metadata: await ProductService.createProduct(
                req.body.product_type,
                req.body
            ),
        }).send(res);
    };
}

module.exports = ProductController;
