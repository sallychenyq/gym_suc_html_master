import * as privateConfit from './_config.js';
export const keys={
    default_channel:'default_channel'
}
export const interfaceSuccessCode = 0;
export const clit_token = 'clit_token';

export const APPNAME = privateConfit.APPNAME;
export const APPNAME_STRING = privateConfit.APPFULLNAME;
export const host = new (class {
    get addrJ() {
        return  process.env.VUE_APP_BASE_API
    }
    get wss() {
        return process.env.VUE_APP_BASE_WS_API
    }
    get wssType() {
        return process.env.VUE_APP_BASE_WS_TYPE || null
    }
})();
