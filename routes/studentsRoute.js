import express from "express";
import {
  create,
  createForm,
  fetch,
  getUpdateForm,
  update,
  deleteStudent
} from "../controller/studentController.js";

const route = express.Router();

route.get("/", fetch);

route.get("/create", createForm);
route.post("/create", create);

route.get("/:id/update", getUpdateForm);
route.post("/:id/update", update);

route.post("/:id/delete", deleteStudent);


export default route;