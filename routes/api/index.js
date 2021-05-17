const router = require("express").Router();
const userRoutes = require("./users");
const gameRoutes = require("./game");

router.use("/users", userRoutes);
router.use("/game", gameRoutes);

module.exports = router;
