import { Base } from "./Base.js";
import service from "../service.js";

export default class Word extends Base {
  constructor(props) {
    super(props);
    this.tries = [];
    this.wordLength = 0;
    this.word = '';
    service.getWord()
      .then(res => {
        this.tries = res.tries;
        this.wordLength = res.wordLength;
        this.content.innerHTML = this.generateTemplate(this.tries,  this.wordLength);
        this.content.querySelector('form').addEventListener('submit',this.onSubmit);
        this.content.querySelector('#word-input').addEventListener('keyup', this.onTypeHandler.bind(this));
      }).catch(() => {
    });

  };

  onSubmit(event) {
    event.preventDefault();
    const word = event.target.word.value;
  };
  
  onTypeHandler(event) {
    this.word = event.target.value;
    const btn = this.content.querySelector('.submit-btn');
    btn.disabled = this.word.length !== this.wordLength;
  }
  
  generateTemplate(tries, maxLength) {
    return `
    <h1>Познай думата</h1>
    <form>
    <input name="word" id="word-input" maxlength="${maxLength}" minlength="${maxLength}"/>
    <button type="submit" class="submit-btn" disabled="${this.word.length !== maxLength}">Проверка</button>
</form>
    `;
  }
}