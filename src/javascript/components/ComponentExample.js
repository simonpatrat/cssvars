class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        const defaults = {
            type: 'decrease',
        }
        const options = JSON.parse(this.dataset.options);

        this.settings = {
            ...defaults,
            ...options,
        };

        this.handleClick = this.handleClick.bind(this);
        this.savedColor = window.getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary');
        this.currentColor = null;
        this.currentAnimationSpeed = 0;

        this.initElement();

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
                    transition: all 300ms ease;
                }

            </style>
            <button class="animation">${this.settings.type}</button>
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

    changeColor() {
        if (this.currentColor  === 'blue') {
            document.documentElement.style.setProperty('--color-primary', this.savedColor);
            this.currentColor = this.savedColor;
        } else {
            document.documentElement.style.setProperty('--color-primary', 'blue');
            this.currentColor = 'blue';
        }
    }

    updateAnimationSpeed() {
        const { type: buttonType } = this.settings;
        const currentSpeed = parseInt(
            window.getComputedStyle(document.documentElement)
                 .getPropertyValue('--animation-speed')
                 .replace(/ms/gi, '')
         );

         let newSpeed = 0;
         if (buttonType === 'increase') {
             newSpeed = currentSpeed > 200 ? currentSpeed - 100 : currentSpeed;
         } else if (buttonType === 'decrease') {
             newSpeed = currentSpeed < 5000 ? currentSpeed + 100 : currentSpeed;
         }

         this.currentAnimationSpeed = newSpeed;
         document.documentElement.style.setProperty('--animation-speed', `${this.currentAnimationSpeed}ms`);
    }

    handleClick(event) {

        const { type: buttonType } = this.settings;

        if (buttonType === 'change-color') {
            this.changeColor();
        } else {
            this.updateAnimationSpeed();
        }

    }

}

window.customElements.define('custom-button', ButtonComponent);