import {Component} from "./component";
import {Autobind} from "../decorator/autobind";
import {Project} from "../model/model";
import {Draggable} from "../model/drag-drop";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get person() {
    if (this.project.people === 1) return "1 person";
    return `${this.project.people} persons`;
  }
  // listEl = document.getElementById(`${this.type}-projects-listt`)! as HTMLUListElement; //refering to the set up ID
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
    // const listItem = document.createElement("li");
    // listItem.textContent = item.title;
    // // showing the title in the web, one by one

    // this.listEl.appendChild(listItem);
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent) {
    console.log("ended");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.person + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }

}
