import {Component} from "./component";
import {Autobind} from "../decorator/autobind";
import {Project, ProjectStatus} from "../model/model";
import {DragTarget} from "../model/drag-drop";
import {projectState} from "../state/state";
import {ProjectItem} from "./item";


export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProject: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", type + "-projects");

    this.configure();
    this.renderContent(); //to add the list and header of this.element
    // is also interchangeable, weil die Reihe völlig egal ist
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  @Autobind
  dropHandler(event: DragEvent) {
    projectState.moveProject(
      event.dataTransfer!.getData("text/plain"),
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  // inserting the title to the template
  private renderProject() {
    const listEl = document.getElementById(
      `${this.type}-projects-listt`
    )! as HTMLUListElement; //refering to the set up ID
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProject) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  //make the template
  renderContent() {
    const listId = `${this.type}-projects-listt`; //setting up the ID
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    projectState.addListener((project: Project[]) => {
      const relevantPrj = project.filter((prj) => {
        if (this.type === "active") {
          return prj.state === ProjectStatus.Active;
        }
        return prj.state === ProjectStatus.Finished;
      });
      this.assignedProject = relevantPrj;
      // dijalankan 2 kali karena ProjectList dipanggil 2x

      this.renderProject();
    });

    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }
}
