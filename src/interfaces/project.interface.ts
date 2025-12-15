export enum Status {
  new = "NEW",
  inProgress = "IN_PROGRESS",
  completed = "COMPLETED",
  archived = "ARCHIVED",
  terminated = "TERMINATED",
}

export interface Project {
  uid: string;
  name: string;
  tags: string[];
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
}
