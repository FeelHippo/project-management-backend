import { Request, Response } from "express";
import ProjectRepository from "../repository/project.repository";
import { StatusCodes } from "http-status-codes";
import { Project } from "../interfaces/project.interface";
import { ProjectModel } from "../data/project.entity";

class ProjectController {
  constructor(repository: ProjectRepository) {
    this._repository = repository;
  }

  private _repository: ProjectRepository;
  async allProjects(req: Request, res: Response): Promise<void> {
    try {
      console.info("Request Start: allProjects");
      const data = await this._repository.readAll();
      console.info("Request Data: allProjects\n", data);
      const projects = data.map(
        ({
          uid,
          name,
          description,
          tags,
          status,
          createdAt,
          updatedAt,
          wasUpdated,
          archivedAt,
          wasArchived,
          isStoredOnDB,
        }) => ({
          uid,
          name,
          description,
          tags,
          status,
          createdAt,
          updatedAt,
          wasUpdated,
          archivedAt,
          wasArchived,
          isStoredOnDB,
        }),
      );
      console.info("Request Projects: allProjects\n", projects);
      res.status(StatusCodes.OK).send({ projects });
    } catch (error: any) {
      console.error("ERROR: allProjects\n", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async projectById(req: Request, res: Response): Promise<void> {
    try {
      console.info("Request Start: projectById");
      const { id } = req.params as { id: string };
      const {
        uid,
        name,
        description,
        tags,
        status,
        createdAt,
        updatedAt,
        wasUpdated,
        archivedAt,
        wasArchived,
        isStoredOnDB,
      } = (await this._repository.readOne(id)) as ProjectModel;
      const project = {
        uid,
        name,
        description,
        tags,
        status,
        createdAt,
        updatedAt,
        wasUpdated,
        archivedAt,
        wasArchived,
        isStoredOnDB,
      };
      console.info("Request Project: projectById\n", project);
      res.status(StatusCodes.OK).send({ project });
    } catch (error: any) {
      console.error("ERROR: projectById\n", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async addProject(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, tags } = req.body as Pick<
        Project,
        "name" | "description" | "tags"
      >;
      console.info("Request Start: addProject\n", name, description, tags);
      await this._repository.createOne(name, description, tags);
      console.info("Request Success: addProject\n", name, description, tags);
      res.status(StatusCodes.CREATED).send();
    } catch (error: any) {
      console.error("ERROR: addProject\n", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async modifyProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { changes } = req.body as {
        changes: { property: string; value: string }[];
      };
      console.info("Request Start: modifyProject\n", id, changes);
      await this._repository.modifyOne(id, changes);
      console.info("Request Success: modifyProject\n", id, changes);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      console.error("ERROR: modifyProject\n", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  async removeProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      console.info("Request Start: removeProject\n", id);
      await this._repository.removeOne(id);
      console.info("Request Success: removeProject\n", id);
      res.status(StatusCodes.OK).send();
    } catch (error: any) {
      console.error("ERROR: removeProject\n", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }
}

export default ProjectController;
