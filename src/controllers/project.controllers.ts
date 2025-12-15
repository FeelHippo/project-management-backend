import { Request, Response } from "express";
import { users } from "../db/postgres.schema";
import ProjectRepository from "../repository/project.repository";
import { StatusCodes } from "http-status-codes";
import { Project } from "../interfaces/project.interface";
import Container from "../dependencies/container";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

class ProjectController {
  constructor(container: Container & { db: NodePgDatabase }) {
    this._repository = new ProjectRepository(container.db, users);
  }

  private readonly _repository: ProjectRepository;
  async allProjects(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this._repository.readAll();
      const projects = data.map(
        ({
          uid,
          name,
          description,
          status,
          createdAt,
          updatedAt,
          wasUpdated,
          archivedAt,
          wasArchived,
        }) => ({
          uid,
          name,
          description,
          status,
          createdAt,
          updatedAt,
          wasUpdated,
          archivedAt,
          wasArchived,
        }),
      );
      res.status(StatusCodes.OK).send({ projects });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async projectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const {
        uid,
        name,
        description,
        status,
        createdAt,
        updatedAt,
        wasUpdated,
        archivedAt,
        wasArchived,
      } = await this._repository.readOne(id);
      const project = {
        uid,
        name,
        description,
        status,
        createdAt,
        updatedAt,
        wasUpdated,
        archivedAt,
        wasArchived,
      };
      res.status(StatusCodes.OK).send({ project });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async addProject(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, status, tags } = req.body as Pick<
        Project,
        "name" | "description" | "status" | "tags"
      >;
      await this._repository.createOne(name, description, status, tags);
      res.status(StatusCodes.CREATED).send();
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async modifyProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { changes } = req.body as {
        changes: { property: string; value: string }[];
      };
      await this._repository.modifyOne(id, changes);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async removeProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this._repository.removeOne(id);
      res.status(StatusCodes.OK).send();
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }
}

export default ProjectController;
