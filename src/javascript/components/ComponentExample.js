class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.initElement();
    }
    
    initElement() {
        this.template = document.createElement('template');
        this.template.innerHTML = this.getTemplate();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
    
    getTemplate() {
        return `
            <button class="animation">Click me</button>
        `;
    }
}

window.customElements.define('custom-button', ButtonComponent);