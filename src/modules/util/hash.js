let hashStorage = {};

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

exports.hash = function ( key, value ) {

};
