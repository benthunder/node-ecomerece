const ProductService = require("../services/product.service");
const { CREATED, OK } = require("../utils/reponse-success.util");

class ProductController {
    static createProduct = async (req, res, next) => {
        return await new CREATED({
            metadata: await ProductService.createProduct(
                req.body.product_type,
                {
                    ...req.body,
                    product_user:req.token.user
                }
                
            ),
        }).send(res);
    };
}

module.exports = ProductController;
