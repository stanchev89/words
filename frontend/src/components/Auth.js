import { Base } from "./Base.js";
import { appRouter } from "../router.js";

const formTemplates = {
    login: `
        <input name="username" placeholder="Username" />
        <input name="password" placeholder="Password" type="password"/>
        <button type="submit">Login</button>
    `,
    register: `
        <input name="username" placeholder="Username" />
        <input name="password" placeholder="Password" type="password"/>
        <input name="rePassword" placeholder="Repeat Password" type="password"/>
        <button type="submit">Register</button>
    `
};

export default class Auth extends Base {

    constructor(props) {
        super(props);
    };

    connectedCallback() {
        super.connectedCallback();
        this.mode = this.getAttribute('mode');
        this.content.innerHTML = `
<style>
    p{
        color: cyan;
    }
</style>
    <h1>Auth ${this.mode}</h1>
    <p>AUTH TEST</p>
    ${this.getTemplate(this.mode)}
    `;
        this.root.querySelector('form')?.addEventListener('submit', this.onSubmitHandler.bind(this));
    }

    getTemplate(mode) {
        return `
            <form>
                ${formTemplates[mode] || formTemplates.login}
            </form>
        `
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.service.login().then(() => appRouter.navigateTo('/'));
    }
}
