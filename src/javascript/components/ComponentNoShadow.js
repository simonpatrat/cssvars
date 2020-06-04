class ButtonComponentNoShadow extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.innerHTML = this.getTemplate();
        this.savedColor = document.documentElement.style.getPropertyValue('--color-primary');
        this.currentColor = null;
    }

    connectedCallback() {
        this.attachListeners();
    }

    disconnectedCallback() {
       this.detachListeners();
    }

    getTemplate() {
        return `
            <style>
                button {
                    background: var(--color-custom-button-bg, blue);
                    color: #fff;
                    padding: 12px;
                    border-radius: 20px;
                    border: none;
                    min-width: 120px;
                    animation: var(--primary-animation) var(--animation-speed) infinite;
                }
            </style>
            <button class="animation">Click me</button>
        `;
    }

    getInnerElement() {
        return this.template.content.querySelector('button');
    }

    attachListeners() {
        this.querySelector('button').addEventListener('click', this.handleClick);
    }

    detachListeners() {
        this.querySelector('button').removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        if (this.currentColor  === 'blue') {
            document.documentElement.style.setProperty('--color-primary', this.savedColor);
            this.currentColor = this.savedColor;
        } else {
            document.documentElement.style.setProperty('--color-primary', 'blue');
            this.currentColor = 'blue';
        }
    }

}

window.customElements.define('custom-button-no-shadow', ButtonComponentNoShadow);