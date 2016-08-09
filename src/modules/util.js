//---------- ./_variable.js.js ----------
const doc = document;
const head = doc.head;
//---------- ./autosize.js.js ----------
//---------- ./camel2hyphen.js.js ----------
exports.camel2hyphen = function ( string ) {
    return string.replace(/[A-Z]/g, function ( match ) {
        return '-' + match.toLowerCase();
    });
};
//---------- ./compatible.js.js ----------
module.exports = function ( microApp ) {
    // A fallback of micro-app
    [
        'filters',
    ].forEach(( methodName ) => {
        microApp[methodName] = function () {
            console.warn(`micro-app: "${ methodName }" is an empty function if this browser is not Safari or website is opened in standalone mode.`);
            return this;
        };
    });
}
//---------- ./create-element.js.js ----------
const container = doc.createElement('div');

exports.createElement = function ( html ) {
    container.innerHTML = html;
    return container.firstElementChild;
};
//---------- ./define-static-property.js.js ----------
exports.defineStaticProperty = function ( name, value ) {
    Object.defineProperty(
        this,
        name,
        {
            value,
            writable : false,
            enumerable : false,
            configurable : false,
        }
    );
    return this;
};
//---------- ./filters.js.js ----------
exports.filters = {};
//---------- ./hide.js.js ----------
exports.hide = function () {
    head.removeChild(this);
    return this;
};
//---------- ./location-hash.js.js ----------
let hashObject = {};

function update () {
    let result = [];
    for (let key in hashObject) {
        let value = hashObject[key];
        if (value !== null) {
            result.push(key + '=' + value);
        }
    }
    let hash = location.hash;
    result = result.join('&');
    if (hash !== result) {
        location.hash = result;
    }
}

module.exports = {
    add ( key, value ) {
        hashObject[key] = value;
        update();
    },
    remove ( key ) {
        let value = hashObject[key];
        if (value === null || value === void 0) {
            return
        }
        hashObject[key] = null;
        update();
    }
}
//---------- ./not-a-function.js.js ----------
exports.NAF = function ( value ) {
    return typeof value == 'function' ? NAF(value()) : value;
};
//---------- ./on-hash-change-handler.js.js ----------
let keys = ['redirect-uri', 'default-splash', 'landscape-splash'];

exports.onHashChangeHandler = function ( uri ) {
    let position = uri.indexOf('#');
    if (position > -1 && position < uri.length - 1) {
        let content = uri.substring(position + 1);
        let expression = new RegExp(`(^|&)(${ keys.join('|') })=`);
        if (!expression.test(content)) {
            console.warn('micro-app: "location.hash" is in use to save the params.');
        }
    }
};
//---------- ./parse-argument.js.js ----------
exports.parseArgument = function ( expression ) {
    let left = /\(/.test(expression);
    let right = /\)/.test(expression);
    if (left || right) {
        try {
            if (!left) {
                throw new SyntaxError('[micro-app] Missing "(" before argument list.');
            }
            if (!right) {
                throw new SyntaxError('[micro-app] Missing ")" after argument list.');
            }
            if (!/\)$/.test(expression)) {
                throw new SyntaxError(`[micro-app] Unexpected end of "${ expression.match(/.*(\).*$)/)[1] }".`);
            }
            let [ , methodName, methodArgument ] = expression.match(/(.*?)\((.*)\)$/);
            return [methodName, JSON.parse(`[${ methodArgument }]`)];
        } catch (e) {
            // Function will be stoped cause throw an error sync
            setTimeout(() => {
                throw e;
            }, 0);
            return [''];
        }
    } else {
        return [expression, []];
    }
};
//---------- ./parse-filters.js.js ----------
exports.parseFilters = function ( expression ) {
    let globalFilters = this.globalFilters;
    if (globalFilters !== void 0) {
        if (typeof globalFilters == 'string') {
            return [globalFilters].concat(expression.substring(1).split('|'));
        }
        if (globalFilters instanceof Array) {
            let result = [];
            let tips = false;
            globalFilters.forEach(( filter ) => {
                if (typeof filter == 'string') {
                    result.push(filter);
                } else {
                    if (!tips) {
                        console.warn(`micro-app: All members in globalFilters will be ignored except String.`);
                        tips = true;
                    }
                }
            });
            return result.concat(expression.substring(1).split('|'));
        }
        console.warn(`micro-app: globalFilters must be String or an array of String.`);
    }
    return expression ? expression.substring(1).split('|') : [];
};
//---------- ./parse-url.js.js ----------
exports.parseUrl = function ( url ) {
    let a = doc.createElement('a');
    a.href = url;
    return a;
};
//---------- ./set-attribute.js.js ----------
const proto = Element.prototype;

exports.setAttribute = function ( attribute, value ) {
    if (value === null) {
        proto.removeAttribute.call(this, attribute);
    } else {
        proto.setAttribute.call(this, attribute, value);
    }
    return this;
};
//---------- ./show.js.js ----------
exports.show = function () {
    head.appendChild(this);
    return this;
};
//---------- ./storage.js.js ----------
exports.saveData = function ( key, value ) {
    localStorage.setItem('micro-app:' + key, typeof value == 'string' ? value : JSON.stringify(value));
};

exports.loadData = function ( key ) {
    return localStorage.getItem('micro-app:' + key);
};
