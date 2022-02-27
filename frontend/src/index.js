import service from "./service.js";
import  Header  from './Header/Header.js';
import Rules from "./components/Rules/Rules.js";
import Rank from "./Rank/Rank.js";
import Profile from "./components/Profile/Profile.js";
import Auth from "./components/Auth/Auth.js";
import Word from "./components/Word/Word.js";

(
    function () {
      customElements.define('app-header', Header);
      customElements.define('app-rules', Rules);
      customElements.define('app-rank', Rank);
      customElements.define('app-profile', Profile);
      customElements.define('app-auth', Auth);
      customElements.define('app-word', Word)
    }
)
();
