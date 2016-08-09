const proto = Element.prototype;

exports.setAttribute = function ( attribute, value ) {
    if (value === null) {
        proto.removeAttribute.call(this, attribute);
    } else {
        proto.setAttribute.call(this, attribute, value);
    }
    return this;
};
