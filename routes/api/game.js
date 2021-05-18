const router = require("express").Router();
const gameController = require("../../controllers/gameController");

router.route("/")
  .get(gameController.findAll)
  .post(gameController.create);

// router.route("/:id")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

module.exports = router;
