const express = require("express");
const { handleError } = require("../../utils/handle-error");
const { authentication } = require("../../utils/auth");

const ProductController = require("../../controllers/product.controller");

const router = express.Router();

router.use(handleError(authentication));
router.post("", handleError(ProductController.createProduct));

module.exports = router;
