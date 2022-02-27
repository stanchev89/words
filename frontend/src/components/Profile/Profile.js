import { Base } from "../Base.js";

export default class Profile extends Base {
    constructor(props) {
        super(props);
        this.content.innerHTML = `
    <h1>Profile</h1>
    `;
    }

}
