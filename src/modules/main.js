import {
    // When the type of value is `function`, return its result
    NAF,
    // A shortcut to show or hide the tag
    show,
    hide,
    // A shortcut to get or set hash param
    hash,
    // Collection of filter
    filter,
    // A shortcut to parse url
    parseUrl,
    // UserAgent result
    userAgent,
    // Camel to Hyphen
    camel2hyphen,
    // A shortcut to set or remove attribute
    setAttribute,
    // Extract the filter from expression
    parseFilter,
    // Listener of hash
    hashListener,
    // A shortcut to create element
    createElement,
    // Extract the argument from expression
    parseArgument,
    // A shortcut to define static property
    defineStaticProperty,
} from './util';

// A shortcut to override method
import { override } from './override';

// A shortcut to define property
import { defineProperty } from './define-property';

// A shortcut to create multi element
import { createMultiElement } from './create-multi-element';

exports.main = function ( microApp ) {

    // A default value to display
    const defaultArrayValue = Object.prototype.toString.call([]);

    // Give a warning if `location.hash` is in use
    hashListener(['href']);

    // Define a filter by `microApp.filters`
    microApp
    ::defineStaticProperty(
        'filter',
        function ( name, handler ) {
            if (arguments.length < 2) {
                throw new TypeError(`[micro-app] 2 arguments required, but only ${ arguments.length } present.`);
            }
            if (typeof name != 'string') {
                throw new TypeError(`[micro-app] A valid filter name should be string.`);
            }
            if (!name) {
                throw new TypeError(`[micro-app] A valid filter name should not be empty string.`);
            }
            if (/[\||\(|\)]/.test(name)) {
                throw new TypeError(`[micro-app] "${ name }" is not a valid filter name, "${ name.match(/[\||\(|\)]/)[0] }" is not allowed.`);
            }
            if (typeof handler != 'function') {
                throw new TypeError(`[micro-app] The second argument must be a function.`);
            }
            filter[name] = handler;
            return this;
        }
    );

    // A filter of `precomposed`
    microApp.filters(
        'precomposed',
        function () {
            this.rel = 'apple-touch-icon-precomposed';
        }
    );

    // A filter of `autosize`
    microApp.filters(
        'autosize',
        function () {
            let type = this.getAttribute('rel') === 'apple-touch-startup-image' ? 'splash' : 'icon';
            let attributes = autosize(type);
            if (attributes) {
                for (let attributeName in attributes) {
                    this.setAttribute(attributeName, attributes[attributeName]);
                }
            }
        }
    );

    // Create element in buffer
    let capable = createElement('<meta name="apple-mobile-web-app-capable" content="yes">');
    let statusBarStyle = createElement('<meta name="apple-mobile-web-app-status-bar-style">');
    let title = createElement('<meta name="apple-mobile-web-app-title">');

    microApp
    // Capable, `null` equates disable, others will change to enable
    ::defineProperty({
        name : 'capable',
        onChange ( value, previous ) {
            microApp::setAttribute(this.name, value);
            if (value === null) {
                capable::hide();
            }
            if (previous === null) {
                capable::show();
            }
        },
    })
    // StatusBarStyle, normally, the value is one of `black-translucent`,`black`,`white`
    ::defineProperty({
        name : 'statusBarStyle',
        hyphenName : camel2hyphen('statusBarStyle'),
        onChange ( value, previous ) {
            microApp::setAttribute(this.hyphenName, value);
            statusBarStyle::setAttribute('content', value);
            if (value === null) {
                statusBarStyle::hide();
            }
            if (previous === null) {
                statusBarStyle::show();
            }
        },
    })
    // Title, the app's name
    ::defineProperty({
        name : 'title',
        onChange ( value, previous ) {
            microApp::setAttribute(this.name, value);
            title::setAttribute('content', value);
            if (value === null) {
                title::hide();
            }
            if (previous === null) {
                title::show();
            }
        },
    })
    // Icon, the cover of app
    ::defineProperty({
        result : [],
        name : 'icon',
        code : '<link rel="apple-touch-icon">',
        onChange ( value, previous ) {
            // Format to `Array`
            let currentItems = (value instanceof Array) ? value.slice(0) : value === null ? [] : [value];
            let previousItems = this.result;
            // Create or remove the elements
            this.result = createMultiElement(
                currentItems,
                previousItems,
                {
                    code : this.code,
                    attribute : 'href',
                    success ( value ) {
                        // Invoke `success` when element is created successfully and pass the `href` as value
                        let interrupt = false;
                        parseFilter(parseUrl(value).hash).forEach(( expression ) => {
                            if (interrupt || expression === '') {
                                return;
                            }
                            let [ filterName, filterArgument ] = parseArgument(expression);
                            let method = filter[filterName];
                            if (typeof method == 'function') {
                                interrupt = NaF(method.apply(this, filterArgument)) === false;
                            }
                        });
                    },
                }
            );
            // Set value as attribute
            microApp::setAttribute(this.name, value instanceof Array ? defaultArrayValue : value);
        },
    })
    // Splash, the start up image
    ::defineProperty({
        result : [],
        name : 'splash',
        code : '<link rel="apple-touch-startup-image">',
        onChange ( value, previous ) {
            // Format to `Array`
            let currentItems = (value instanceof Array) ? value.slice(0) : value === null ? [] : [value];
            let previousItems = this.result;
            // Create or remove the elements
            this.result = createMultiElement(
                currentItems,
                previousItems,
                {
                    code : this.code,
                    attribute : 'href',
                    success ( value ) {
                        // Invoke `success` when element is created successfully and pass the `href` as value
                        let interrupt = false;
                        parseFilter(parseUrl(value).hash).forEach(( expression ) => {
                            if (interrupt || expression === '') {
                                return;
                            }
                            let [ filterName, filterArgument ] = parseArgument(expression);
                            let method = filter[filterName];
                            if (typeof method == 'function') {
                                interrupt = NaF(method.apply(this, filterArgument)) === false;
                            }
                        });
                    },
                }
            );
            // Set value as attribute
            microApp::setAttribute(this.name, value instanceof Array ? defaultArrayValue : value);
        },
    })
    // The website which you want to redirect to
    ::defineProperty({
        name : 'href',
        onChange ( value, previous ) {
            microApp::setAttribute(this.name, value);
            hash(this.name, value);
        },
    })
    // Override the method `getAttribute`
    ::override(
        'getAttribute',
        function ( event, [ key ] ) {
            if (key in defineProperty) {
                // This attribute is defined
                event.stopPropagation();
                return this[key];
            }
        },
    )
    // Override the method `setAttribute`
    ::override(
        'setAttribute',
        function ( event, [ key, value ] ) {
            if (key in defineProperty) {
                // This attribute is defined
                event.stopPropagation();
                return this[key] = value;
            }
        },
    )
    // Override the method `removeAttribute`
    ::override(
        'removeAttribute',
        function ( event, [ key ] ) {
            if (key in defineProperty) {
                // This attribute is defined
                event.stopPropagation();
                return this[key] = null;
            }
        },
    )
    ::defineStaticProperty('hash', hash);
};
