import { Base } from '../components/Base.js';
import { appRouter } from "../router.js";
import styles from './Header.styles.js';

export default class Header extends Base {
    constructor() {
        super();
        this.isLogged = this.service.authUser.value;
        this.service.authUser.subscribe((v) => {
            this.isLogged = v;
            this.content.innerHTML = this.generateTemplate(v);
            this.setListeners();

        });
        this.content.innerHTML = this.generateTemplate(this.isLogged);
        this.setListeners();
    }

    connectedCallback() {
        super.connectedCallback();
        appRouter.navigateTo(location.toString());
    };

    setListeners() {
        this.content.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const href = e.target.attributes.href?.value;
                if (href) {
                    return appRouter.navigateTo(href);
                }
            })
        });
        const logoutEl = this.content.querySelector('.logout');
        if (logoutEl) {
            logoutEl.addEventListener('click', this.logout.bind(this));
        }
    }

    logout() {
        this.service.logout().then(() => appRouter.navigateTo('/auth?action=login'))
    }

    generateTemplate(isLoggedIn) {
        return `${styles}
        <nav class="nav">
        <article class="header-wrapper">
         ${isLoggedIn
            ? ` <a href="/" class="nav__link" data-link>Играй</a>
         <a href="/rules" class="nav__link" data-link>Правила</a>
         <a href="/rank" class="nav__link" data-link>Класиране</a>
         <a href="/profile" class="nav__link" data-link>Профил</a>
         <a class="logout" data-link>Изход</a>`
            : ` <a href="/rules" class="nav__link" data-link>Правила</a>
         <a href="/auth?action=register" class="nav__link" data-link>Регистрация</a>
         <a href="/auth?action=login" class="nav__link" data-link>Вход</a>`
        }
        </article>
        </nav>`;
    }

}
