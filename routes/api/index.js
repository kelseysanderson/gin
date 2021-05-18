const router = require("express").Router();
const userRoutes = require("./users");
const gameRoutes = require("./game");
const authRoutes = require("./auth");

router.use("/users", userRoutes);
router.use("/game", gameRoutes);
router.use("/auth", authRoutes);
module.exports = router;
