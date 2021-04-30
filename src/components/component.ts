export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostId: string, elId: string) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // importedNode is only a document-fragment of templateElement. We need to access the property
    this.element = importedNode.firstElementChild as U;
    this.element.id = elId;
    // to call from css

    this.attach(); //just to add this.element to the html
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
    //add this.element to index.html before the tag of hostElement
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
