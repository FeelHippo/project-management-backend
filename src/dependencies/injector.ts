import Container from "./container";
import db from "../db/drizzle.init";
import ProjectController from "../controllers/project.controllers";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export default function () {
  let container = new Container();

  container.service("db", db);
  container.service(
    "projectController",
    new ProjectController(container as Container & { db: NodePgDatabase }),
  );

  return container as Container & {
    sql: NodePgDatabase;
    projectController: ProjectController;
  };
}
