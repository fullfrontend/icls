import xmljs from 'xml-js';
import Store from '../model/store';

import {autoCast, castString} from './utils';


export default class Parser {
    constructor () {
        this._store = new Store();
    }

    _convertToUnderstandable (xml) {
        return xmljs.xml2js(xml);
    }

    _buildTree (iclsXmlObj) {
        let rootNode = iclsXmlObj.elements[0];
        this._readTree(rootNode);
    }

    _readTree (el, ancestors = []) {
        if (Array.isArray(el)) {
            for (let element of el) {
                this._readTree(element, ancestors);
            }
            return;
        }

        this._parseSchemeNode(el, ancestors);
        this._parseOptionNode(el, ancestors);
        this._parseColorNode(el, ancestors);
        this._parseAttributeNode(el, ancestors);
        this._parseChildNodes(el, ancestors);
    }

    _prepareNodeValues (values) {
        return Object.keys(values).reduce((accumulator, curr) => {
            accumulator[castString(curr)] = autoCast(values[curr]);
            return accumulator;
        }, {});
    }


    _parseSchemeNode (el, ancestors) {
        if (el.name !== 'scheme' || el.attributes === undefined) {
            return;
        }

        this._setInStore(el.attributes, ancestors);
    }

    _parseOptionNode (el, ancestors) {
        if (el.name !== 'option' || el.attributes === undefined) {
            return;
        }

        if (el.attributes.value === undefined && el.elements !== undefined) {
            this._readTree(el.elements, [
                ...ancestors,
                el.attributes.name
            ]);
            return;
        }
        let attrs = {};
        attrs[el.attributes.name] = el.attributes.value;
        this._setInStore(attrs, ancestors);
    }

    _parseColorNode (el, ancestors) {
        if (el.name !== 'colors' || el.elements === undefined) {
            return;
        }

        this._readTree(
            el.elements,
            [
                ...ancestors,
                'colors'
            ]
        );
    }

    _parseAttributeNode (el, ancestors) {
        if (el.name !== 'attributes' || el.elements === undefined) {
            return;
        }

        this._readTree(el.elements, ancestors);
    }

    _parseChildNodes (el, ancestors) {
        if (el.elements === undefined) {
            return;
        }

        this._readTree(el.elements, ancestors);
    }

    getStore () {
        return this._store;
    }

    parse (iclsXmlString) {
        const iclsJsObj = this._convertToUnderstandable(iclsXmlString);
        this._buildTree(iclsJsObj);
        return this.getStore();
    }

    _setInStore (attrs, ancestors) {
        attrs = this._prepareNodeValues(attrs);
        for (let key in attrs) {
            let storeKey = this._getStoreKey(key, ancestors);
            this._store.set(storeKey, attrs[key]);
        }
    }

    _getStoreKey (key, ancestors) {
        let path = [
            ...ancestors,
            key
        ];
        return castString(path.join('.'));
    }
}
