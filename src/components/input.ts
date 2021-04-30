import {Component} from "./component";
import {Validate, Validatable} from "../util/validate";
import {Autobind} from "../decorator/autobind";
import {projectState} from "../state/state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

  this.configure();
  }

  renderContent() {}

  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const validatableTitle: Validatable = {
      required: true,
      value: enteredTitle,
    };

    if (
      Validate(validatableTitle) &&
      Validate({ value: enteredDescription, required: true, minLength: 5 }) &&
      Validate({ value: enteredPeople, required: true, min: 1 })
    ) {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
    alert("invalid input!");
    return;
  }
  
  private clearQuery() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault(); //prevent default form submission, which would request HTP request to be sent

    //naturally we get the userinput after submit event
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearQuery();
    }
  }
  
  configure() {
    this.element.addEventListener("submit", this.submitHandler); //the function is not called, because we wait for the submit event
  }
}
