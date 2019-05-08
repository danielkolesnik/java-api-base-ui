/* eslint no-useless-escape: "off" */
/* eslint require-jsdoc: "off" */
/* eslint max-len: "off" */

// local storage API
const localStorage = window.localStorage;
// polyfill from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
// emulation of local storage on cookies
const cookieStorage = {
    length: (document.cookie.match(/=/g)||localStorage).length,
    getItem: function (sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp(`(?:^|.*;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`), '$1'));
    },
    key: function (nKeyId) {
        return unescape(document.cookie.replace(/\s*=(?:.(?!;))*$/, '').split(/\s*=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
        if (!sKey) { return; }
        document.cookie = `${escape(sKey) }=${ escape(sValue) }; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`;
        this.length = document.cookie.match(/=/g).length;
    },
    removeItem: function (sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return; }
        document.cookie = `${escape(sKey) }=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        this.length--;
    },
    hasOwnProperty: function (sKey) {
        return (new RegExp(`(?:^|;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=`)).test(document.cookie);
    }
};

// on private browsing Safari does not allow local storage to be used at all
let ok = true;
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
} catch (e) { ok = false; }

const storage = {
    isEmulation: !ok,
    localStorage: localStorage,
    cookieStorage: cookieStorage,

    /**
     * @description before get item convert it from JSON format
     * @param {String} name - name of item
     * @returns {*}
     * @function almStorage.get
     * @public
     */
    get: function getItem (name) {
        const data = (ok ? localStorage : cookieStorage).getItem(name);
        try {
            return JSON.parse(data);
        } catch (e) { return null; }
    },

    /**
     * @description clear value by name
     * @param {String} name - name of item
     * @function almStorage.set
     * @public
     */
    remove: function removeItem (name) {
        ok&&localStorage.removeItem(name);
        cookieStorage.removeItem(name);
    },

    /**
     * @description before set item convert it to JSON
     * @param {String} name - name of item
     * @param {*} data - data by rules convert to json format
     * @function almStorage.set
     * @public
     */
    set: function setItem (name, data) {
        data = JSON.stringify(data);
        this.remove(name);
        ok&&localStorage.setItem(name, data);
        cookieStorage.setItem(name, data);
    },

};

export default storage;
