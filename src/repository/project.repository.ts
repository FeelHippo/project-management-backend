import { ProjectModel } from "../data/project.entity";
import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";

export default class ProjectRepository {
  constructor(db: NodePgDatabase, schema: PgTableWithColumns<any>) {
    this._db = db;
    this._schema = schema;
  }

  private readonly _db: NodePgDatabase;
  private readonly _schema: PgTableWithColumns<any>;

  async readAll(): Promise<ProjectModel[]> {
    const rows = await this._db.select().from(this._schema);
    return rows.map(
      (row) =>
        new ProjectModel(
          row["uid"],
          row["name"],
          row["tags"],
          row["status"],
          row["description"],
          row["createdAt"],
          row["updatedAt"],
          row["archivedAt"],
        ),
    );
  }

  async readOne(uid: string): Promise<ProjectModel | null> {
    const row = (
      await this._db
        .select()
        .from(this._schema)
        .where(eq(this._schema["uid"], uid))
    )[0];
    if (!row) {
      return null;
    }
    return new ProjectModel(
      row["uid"],
      row["name"],
      row["tags"],
      row["status"],
      row["description"],
      row["createdAt"],
      row["updatedAt"],
      row["archivedAt"],
    );
  }

  async createOne(
    name: string,
    description: string,
    tags: string[],
  ): Promise<void> {
    await this._db.insert(this._schema).values({
      name,
      description,
      tags,
    });
  }

  async modifyOne(
    uid: string,
    changes: { property: string; value: string }[],
  ): Promise<void> {
    for (const { property, value } of changes) {
      await this._db
        .update(this._schema)
        .set({
          [property]: value,
          [property === "status" && value === "ARCHIVED"
            ? "archivedAt"
            : "updatedAt"]: sql`NOW()`,
        })
        .where(eq(this._schema["uid"], uid));
    }
  }

  async removeOne(uid: string): Promise<void> {
    await this._db.delete(this._schema).where(eq(this._schema["uid"], uid));
  }
}
