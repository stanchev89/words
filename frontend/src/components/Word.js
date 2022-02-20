import {Base} from "./Base.js";
import service from "../service.js";

const correctPositionsMap = {
    0: 'not-included',
    1: 'included',
    2: 'correct'
};

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
                const template = this.generateTemplate(this.tries, this.wordLength)
                this.content.innerHTML = template;
                this.content.querySelector('form').addEventListener('submit', this.onSubmit);
                this.content.querySelector('#word-input').addEventListener('keyup', this.onTypeHandler.bind(this));
            }).catch(() => {
        });

    };

    onSubmit(event) {
        event.preventDefault();
        const word = event.target.word.value;
        this.service.postWord({word})
            .then(res => {
                const {tries, wordLength} = res;
                this.tries = tries;
                this.wordLength = wordLength;
                return this.generateTemplate(this.tries, this.maxLength);
            }).catch(() => alert('Something went wrong'))
    };

    onTypeHandler(event) {
        this.word = event.target.value;
        const btn = this.content.querySelector('.submit-btn');
        btn.disabled = this.word.length !== this.wordLength;
    }


    generateTemplate(tries, maxLength) {
        return `
<style>
.tries-wrapper {
display: flex;
flex-direction: column;
}
.try {
display: flex;
align-items: center;
}
p {
margin: 10px 0;
padding: 10px 20px;
font-size: 32px;
font-weight: 600;
border: 1px solid black;
border-radius: 10px;
color: black;
background: #fff;
margin-right: 10px;
}
.not-included {
background: gray;
color: white;
}
.included {
background: darkblue;
color: white;
}
.correct {
background: darkgreen;
color: white;
}

</style>
            <h1>Познай думата</h1>
            <form>
                <input name="word" id="word-input" maxlength="${maxLength}" minlength="${maxLength}"/>
                <button type="submit" class="submit-btn" disabled="${this.word.length !== maxLength}">Проверка</button>
                <article class="tries-wrapper">
                </article>
            </form>
            ${this.generateTriesElements(tries)}
        `;
    }

    generateTriesElements(tries) {
        let output = ``;
        for (let i = 0; i < tries.length; i++) {
            const currentTry = tries[i];
            let tryTemplate = `<div class="try">`;
            for (const letter in currentTry) {
                const isCorrectPosition = currentTry[letter];
                const className = correctPositionsMap[isCorrectPosition];
                // const letterElement = document.createElement('p',{class: className},letter);
                const letterElement = `<p class="${className}">${letter}</p>`;
                tryTemplate += letterElement
            }
            tryTemplate += `</div>`;
            output += tryTemplate;
        }
        return output
    }

}
