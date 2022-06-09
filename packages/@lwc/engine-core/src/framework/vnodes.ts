/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { VM } from './vm';

export type Key = string | number;

export const enum VNodeType {
    Text,
    Comment,
    Element,
    CustomElement,
}

export type VNode = VText | VComment | VElement | VCustomElement;
export type VParentElement = VElement | VCustomElement;
export type VNodes = Readonly<Array<VNode | null>>;
export type SlottedVNodes = Readonly<Record<string, (args?: any) => VNodes>>;

export interface BaseVNode {
    type: VNodeType;
    elm: Node | undefined;
    sel: string | undefined;
    key: Key | undefined;
    owner: VM;
}

export interface VText extends BaseVNode {
    type: VNodeType.Text;
    sel: undefined;
    text: string;
    key: undefined;
}

export interface VComment extends BaseVNode {
    type: VNodeType.Comment;
    sel: undefined;
    text: string;
    key: undefined;
}

export interface VBaseElement extends BaseVNode {
    sel: string;
    data: VElementData;
    elm: Element | undefined;
    key: Key;
    children: VNodes;
}

export interface VElement extends VBaseElement {
    type: VNodeType.Element;
}

export interface VCustomElement extends VBaseElement {
    type: VNodeType.CustomElement;
    mode: 'closed' | 'open';
    ctor: any;
    vm: VM | undefined;
    slot: SlottedVNodes;
}

export interface VNodeData {
    // All props are readonly because VElementData may be shared across VNodes
    // due to hoisting optimizations
    readonly props?: Readonly<Record<string, any>>;
    readonly attrs?: Readonly<Record<string, string | number | boolean>>;
    readonly className?: string;
    readonly style?: string;
    readonly classMap?: Readonly<Record<string, boolean>>;
    readonly styleDecls?: Readonly<Array<[string, string, boolean]>>;
    readonly context?: Readonly<Record<string, Readonly<Record<string, any>>>>;
    readonly on?: Readonly<Record<string, (event: Event) => any>>;
    readonly svg?: boolean;
    readonly slotData?: any;
}

export interface VElementData extends VNodeData {
    // Similar to above, all props are readonly
    readonly key: Key;
}

export function isVBaseElement(vnode: VNode): vnode is VElement | VCustomElement {
    const { type } = vnode;
    return type === VNodeType.Element || type === VNodeType.CustomElement;
}

export function isSameVnode(vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
