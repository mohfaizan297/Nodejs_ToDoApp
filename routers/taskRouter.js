const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/new", isAuthenticated, taskController.newTask);
router.get("/my", isAuthenticated, taskController.getMyTasks);
//make sure dynamic route must be place at the bottom
router
  .route("/:id")
  .put(isAuthenticated, taskController.updateTask)
  .delete(isAuthenticated, taskController.deleteTask);

module.exports = router;
