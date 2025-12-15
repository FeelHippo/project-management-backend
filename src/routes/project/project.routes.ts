import { Router } from "express";
import dependencies from "../../dependencies/injector";
import ProjectController from "../../controllers/project.controllers";

const projectRouter = Router();
const controller: ProjectController = dependencies().projectController;

// TODO(Filippo): improve the below
// https://stackoverflow.com/a/59060545/10708345
projectRouter.get("/", controller.allProjects.bind(controller));
projectRouter.get("/:id", controller.projectById.bind(controller));
projectRouter.post("/", controller.addProject.bind(controller));
projectRouter.patch("/:id", controller.modifyProject.bind(controller));
projectRouter.delete("/:id", controller.removeProject.bind(controller));

export default projectRouter;
