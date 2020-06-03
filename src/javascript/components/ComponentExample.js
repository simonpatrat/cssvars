class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.initElement();
        this.savedColor = document.documentElement.style.getPropertyValue('--color-primary');
        this.currentColor = null;
    }

    initElement() {
        this.template = document.createElement('template');
        this.template.innerHTML = this.getTemplate();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(this.template.content.cloneNode(true));

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
                }
            </style>
            <button class="animation">Click me</button>
        `;
    }

    getInnerElement() {
        return this.template.content.querySelector('button');
    }

    attachListeners() {
        const { shadowRoot } = this;
        shadowRoot.querySelector('button').addEventListener('click', this.handleClick);
    }

    detachListeners() {
        const { shadowRoot } = this;
        shadowRoot.querySelector('button').removeEventListener('click', this.handleClick);
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

window.customElements.define('custom-button', ButtonComponent);