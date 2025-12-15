export enum Status {
  new = "NEW",
  inProgress = "IN_PROGRESS",
  completed = "COMPLETED",
  terminated = "TERMINATED",
}

export interface Project {
  uid: string;
  name: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
}
