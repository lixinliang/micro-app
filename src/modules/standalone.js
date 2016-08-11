import {
    // A shortcut to get or set hash param
    hash,
} from './util';

exports.standalone = function () {
    let url = hash('href');
    if (url) {
        // Before redirect, dispatchEvent on `window`
        let redirectEvent = doc.createEvent('CustomEvent');
        redirectEvent.initEvent('redirect', false, true);
        if (window.dispatchEvent(redirectEvent)) {
            location.replace(url);
        }
    }
};
