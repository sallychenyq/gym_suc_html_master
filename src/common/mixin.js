import * as utils from './utils';
const origin = Page;

Page = function (n) {
    mix(n, '_closesharepanel', shareMixin['_closesharepanel']);
    mix(n, '_changeshareimg', shareMixin['_changeshareimg']);
    mix(n, '_opensharepanel', shareMixin['_opensharepanel']);
    mix(n, '_onfloatbtnclicked', shareMixin['_onfloatbtnclicked']);
    n.data = Object.assign({}, n.data, shareMixin['data']);
    origin(utils.CustomPageInitialize(n));
};

function mix(target, funcName, func) {
    if (target[funcName]) {
        let e = target[funcName];

        target[funcName] = function (n) {
            func.call(this, n, funcName);
            e.call(this, n);
        };
    } else {
        target[funcName] = function (n) {
            func.call(this, n, funcName);
        };
    }
}

export const shareMixin = {
    data: {
        currentShareItem: null,
        _currentShareImg: null,
        _showSharePanel: false
    },

    _closesharepanel() {
        this.currentShareItem=null
        this._showSharePanel=false
    },

    _changeshareimg(e) {
        this._currentShareImg=e.detail
    },

    _opensharepanel(item, visiable) {
        this._showSharePanel=visiable || false
        this.currentShareItem=item
    },

    _onfloatbtnclicked(e) {
        switch (e.detail.type) {
            case 'sharing':
                this._showSharePanel=true
                break;

            case 'consulting':
                this.consulting();
                break;

            case 'appointment':
                this.appointment();
                break;

            default:
                break;
        }
    }
};
