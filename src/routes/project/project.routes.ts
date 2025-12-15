import { Router } from "express";
import dependencies from "../../dependencies/injector";
import ProjectController from "../../controllers/project.controllers";

const projectRouter = Router();
const controller: ProjectController = dependencies().projectController;

projectRouter.get("/", controller.allProjects);
projectRouter.get("/:id", controller.projectById);
projectRouter.post("/", controller.addProject);
projectRouter.patch("/:id", controller.modifyProject);
projectRouter.delete("/:id", controller.removeProject);

export default projectRouter;
