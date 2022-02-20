import service from "./service.js";
import  Header  from './components/Header.js';
import Rules from "./components/Rules.js";
import Rank from "./components/Rank.js";
import Profile from "./components/Profile.js";
import Auth from "./components/Auth.js";
import Word from "./components/Word.js";

(function () {
  customElements.define('app-header', Header);
  customElements.define('app-rules', Rules);
  customElements.define('app-rank', Rank);
  customElements.define('app-profile', Profile);
  customElements.define('app-auth', Auth);
  customElements.define('app-word', Word)
})();
