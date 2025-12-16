import { Router } from "express";
import projectRouter from "./project/project.routes";
import authorizer from "../middleware/authorizer.middleware";
import { verifySession as authenticator } from "supertokens-node/recipe/session/framework/express";

const router = Router();

router.use("/projects", [authenticator(), authorizer], projectRouter);

export default router;
