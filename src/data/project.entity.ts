import { Status } from "../interfaces/project.interface";

export class ProjectModel {
  constructor(
    uid: string,
    name: string,
    tags: string[],
    status: Status,
    description: string,
    createdAt: Date,
    updatedAt: Date | null,
    archivedAt: Date | null,
  ) {
    this._uid = uid;
    this._name = name;
    this._tags = tags;
    this._description = description;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._archivedAt = archivedAt;
  }

  private readonly _uid: string;
  private readonly _name: string;
  private readonly _tags: string[];
  private readonly _description: string;
  private readonly _status: Status;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date | null;
  private readonly _archivedAt: Date | null;

  public get uid() {
    return this._uid;
  }

  public get isStoredOnDB(): boolean {
    return !!this._uid;
  }

  public set name(value: string) {
    if (!value.length) {
      throw new Error("Name cannot be empty");
    }
    this._name = value;
  }

  public get name() {
    return this._name;
  }

  public set tags(value: string[]) {
    this._tags = [...this._tags, ...value];
  }

  public get tags() {
    return this._tags;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get description() {
    return this._description ?? "";
  }

  public set status(value: Status) {
    this._status = value;
  }

  public get status() {
    return this._status;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public get wasUpdated() {
    return !!this._updatedAt;
  }

  public get archivedAt() {
    return this._archivedAt;
  }

  public get wasArchived() {
    return !!this._archivedAt;
  }
}
