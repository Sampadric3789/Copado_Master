if (!process.env.COMPAT) {
    customElements.define(
        'ce-with-camel-case-property',
        class extends HTMLElement {
            camelCaseProp;
            ariaReadOnly = 'fffalse';
            tigerLion = 'ceDefault';

            constructor() {
                super();
                this._shadow = this.attachShadow({ mode: 'closed' });
            }
        }
    );
}
