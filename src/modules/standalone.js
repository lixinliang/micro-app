exports.standalone = function () {};

// if (location.hash.length > 1) {
//     let result = {};
//     location.hash.substring(1).split('&').forEach(( keyValue ) => {
//         let [ key = '', value = '' ] = keyValue.split('=');
//         result[key] = value;
//     });
//     let uri = result['redirect-uri'];
//     // Make a fake splash if `default-splash` is exist
//     let { createSplash } = require('./modules/create-splash');
//     createSplash({
//         image : result['default-splash'],
//         css : require('./style_modules/default-splash.scss'),
//     });
//     createSplash({
//         image : result['landscape-splash'],
//         css : require('./style_modules/landscape-splash.scss'),
//     });
//     if (uri) {
//         // This website just is a router, then I will redirect to the target page
//         microApp.redirect = () => {
//             // The router page will not be saved in session history by `location.replace`
//             location.replace(decodeURIComponent(uri));
//         };
//         // Before redirect, dispatchEvent on `window`
//         let redirectEvent = doc.createEvent('CustomEvent');
//         redirectEvent.initEvent('redirect', false, true);
//         // Delay depend `duration`
//         if (result.duration === void 0) {
//             // Redirect right now when `duration` is not exist
//             if (window.dispatchEvent(redirectEvent)) {
//                 microApp.redirect();
//             }
//             // Stop redirecting by `event.preventDefault()`
//         } else {
//             setTimeout(() => {
//                 if (window.dispatchEvent(redirectEvent)) {
//                     microApp.redirect();
//                 }
//             }, result.duration);
//         }
//     } else {
//         if (result.duration !== void 0) {
//             let element = document.documentElement;
//             let attribute = 'micro-splash';
//             let splashEvent = doc.createEvent('CustomEvent');
//             splashEvent.initEvent('splashhide', false, true);
//             setTimeout(() => {
//                 window.dispatchEvent(splashEvent);
//                 element.setAttribute(attribute, '');
//                 setTimeout(() => {
//                     element.removeAttribute(attribute);
//                 }, 600);
//             }, result.duration);
//         }
//         // If `duration` is not exist, splash should be closed manually
//     }
// }
