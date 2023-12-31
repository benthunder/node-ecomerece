const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./access"));
router.use("/v1/api/product", require("./product"));

module.exports = router;