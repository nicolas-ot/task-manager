import {Project, ProjectStatus} from "../model/model";

type Listener = (items: Project[]) => void;

export class ProjectState {
  listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  //gerade gelungen, als das Submit-Ereignis gennant ist

  addProject(title: string, description: string, numPeople: number) {
    const newPrj = new Project(
      Math.random().toString(),
      title,
      description,
      numPeople,
      ProjectStatus.Active
    );
    this.projects.push(newPrj);
    //Es gibt schon 2 Function im listeners, da ProjectList schon zwei mal genannt hat. Darin gibt es auch renderProject Methode.

    this.renderContent();
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  moveProject(projectId: string, newState: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.state !== newState) {
      project.state = newState;
      this.renderContent();
    }
  }

  renderContent() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
      //jeder Function wird benutzt, um Projekt zu AssignedProjekt hinzuzufügen
    }
  }
}

export const projectState = ProjectState.getInstance();
