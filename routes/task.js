const routes = require("express").Router();
const {
  getSingleTask,
  getTasks,
  deleteTask,
  updateTask,
  newTask,
} = require("../controllers/tasks");

routes.get("/tasks", getTasks);
routes.get("/tasks/:id", getSingleTask);
routes.post("/tasks", newTask);
routes.put("/tasks/:id", updateTask);
routes.delete("/tasks/:id", deleteTask);


module.exports = routes;