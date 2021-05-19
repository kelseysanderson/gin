const router = require("express").Router();
const gameController = require("../../controllers/gameController");

router.route("/")
  .get(gameController.find)
  .post(gameController.create);

router.route("/:id")
  .get(gameController.findById)
  .put(gameController.findOneAndUpdate)
  // .delete(userController.remove);

module.exports = router;
