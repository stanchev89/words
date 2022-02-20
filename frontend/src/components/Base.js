import service from "../service.js";

export class Base extends HTMLElement {
  constructor() {
    super();
    this.service = service;
    this.root = this.attachShadow({mode: 'closed'});
    this.rootTemplate = document.createElement('template');
    this.template = `<div class="content"></div>`;
    this.rootTemplate.innerHTML = this.template;
    this.root.appendChild(this.rootTemplate.content.cloneNode(true));
    this.content = this.root.querySelector('.content');
  };

  connectedCallback() {
  }

  disconnectedCallback() {
  }
}