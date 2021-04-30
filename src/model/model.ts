export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public state: ProjectStatus
  ) {}
}

export enum ProjectStatus {
  Active,
  Finished,
}
