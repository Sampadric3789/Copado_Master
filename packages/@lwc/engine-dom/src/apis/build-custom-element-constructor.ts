/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import {
    createVM,
    connectRootElement,
    disconnectRootElement,
    getComponentHtmlPrototype,
    LightningElement,
} from '@lwc/engine-core';
import { assert, isNull } from '@lwc/shared';
import { renderer } from '../renderer';

type ComponentConstructor = typeof LightningElement;
type HTMLElementConstructor = typeof HTMLElement;

/**
 * This function builds a Web Component class from a LWC constructor so it can be
 * registered as a new element via customElements.define() at any given time.
 *
 * @deprecated since version 1.3.11
 *
 * @example
 * ```
 * import { buildCustomElementConstructor } from 'lwc';
 * import Foo from 'ns/foo';
 * const WC = buildCustomElementConstructor(Foo);
 * customElements.define('x-foo', WC);
 * const elm = document.createElement('x-foo');
 * ```
 */
export function deprecatedBuildCustomElementConstructor(
    Ctor: ComponentConstructor
): HTMLElementConstructor {
    if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable-next-line no-console */
        console.warn(
            'Deprecated function called: "buildCustomElementConstructor" function is deprecated and it will be removed.' +
                `Use "${Ctor.name}.CustomElementConstructor" static property of the component constructor to access the corresponding custom element constructor instead.`
        );
    }

    return Ctor.CustomElementConstructor;
}

export function buildCustomElementConstructor(Ctor: ComponentConstructor): HTMLElementConstructor {
    const HtmlPrototype = getComponentHtmlPrototype(Ctor);
    const { observedAttributes } = HtmlPrototype as any;
    const { attributeChangedCallback } = HtmlPrototype.prototype as any;

    return class extends HTMLElement {
        constructor() {
            super();
            assert.isTrue(
                isNull(this.shadowRoot),
                `Found an existing shadow root for the custom element ${Ctor.name}. Call \`hydrateComponent\` instead.`
            );
            assert.isTrue(this.childNodes.length == 0, `Top level elements cannot have children.`);
            createVM(this, Ctor, renderer, {
                mode: 'open',
                owner: null,
                tagName: this.tagName,
            });
        }
        connectedCallback() {
            connectRootElement(this);
        }
        disconnectedCallback() {
            disconnectRootElement(this);
        }
        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            attributeChangedCallback.call(this, name, oldValue, newValue);
        }
        static observedAttributes = observedAttributes;
    };
}
