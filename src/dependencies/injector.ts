import Container from "./container";
import db from "../db/drizzle.init";
import ProjectController from "../controllers/project.controllers";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import ProjectRepository from "../repository/project.repository";
import { users } from "../db/postgres.schema";

export default function () {
  let container = new Container();

  container.service("db", db);
  container.service(
    "projectRepository",
    new ProjectRepository(container.db, users),
  );
  container.service(
    "projectController",
    new ProjectController(container.projectRepository),
  );

  return container as Container & {
    sql: NodePgDatabase;
    projectRepository: ProjectRepository;
    projectController: ProjectController;
  };
}
