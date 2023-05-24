import { api, LightningElement } from 'lwc';

export default class Test extends LightningElement {
    @api prop;
    @api aro = 'false';
    @api tigerLion = 'lwcDefault';
}
