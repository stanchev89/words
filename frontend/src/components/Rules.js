import { Base } from "./Base.js";

export default class Rules extends Base {
  constructor(props) {
    super(props);
    this.content.innerHTML = `
    <h1>Rules</h1>
    `;
  }
}