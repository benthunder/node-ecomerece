const express = require("express");
const { handleError } = require("../../utils/handle-error");
const { authentication } = require("../../utils/auth");

const AccessController = require("../../controllers/access.controller");

const router = express.Router();

router.post("/signup", handleError(AccessController.signUp));
router.post("/signin", handleError(AccessController.signIn));

router.use(handleError(authentication));

router.post("/logout", handleError(AccessController.logOut));
router.post("/refresh_token", handleError(AccessController.refreshToken));

module.exports = router;
