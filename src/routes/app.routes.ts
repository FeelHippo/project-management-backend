import { Router } from "express";
import projectRouter from "./project/project.routes";
import authorizer from "../middleware/authorizer.middleware";

const router = Router();

router.use("/projects", [authorizer], projectRouter);

export default router;
