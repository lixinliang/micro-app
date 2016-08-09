exports.addURLHashListener = function ( keys ) {
    let handler = function ( url ) {
        let position = url.indexOf('#');
        if (position > -1 && position < url.length - 1) {
            let content = url.substring(position + 1);
            let expression = new RegExp(`(^|&)(${ keys.join('|') })=`);
            if (!expression.test(content)) {
                console.warn('micro-app: "location.hash" is in use to save the params.');
            }
        }
    };

    window.addEventListener('hashchange', ( event ) => {
        handler(event.newURL);
    });

    // Check at once when website onload
    {
        handler(location.href);
    }
};
