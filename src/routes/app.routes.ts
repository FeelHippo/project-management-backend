import { Router } from "express";
import projectRouter from "./project/project.routes";
import authorizer from "../middleware/authorizer.middleware";
// TODO(Filippo): see if this middleware:
// #1 works, because it returns { "message": "unauthorized" } when there is a valid session
// #2 is compatible with openAPI validator, since it returns forbidden response bodies
// import { verifySession as authenticator } from "supertokens-node/recipe/session/framework/express";

const router = Router();

router.use("/projects", [authorizer], projectRouter);

export default router;
