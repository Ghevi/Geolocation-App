export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.modalTemplateEl = document.getElementById('modal-template');
    this.contentTemplateEl = document.getElementById(contentId);
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector('.modal');
      this.backdropElement = modalElements.querySelector('.backdrop');
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove() for new browsers
      document.body.removeChild(this.backdropElement); // this.backdropElement.remove() for new browsers
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
