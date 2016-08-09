exports.compatible = function ( microApp ) {
    [
        'filter',
    ].forEach(( methodName ) => {
        microApp[methodName] = function () {
            console.warn(`micro-app: "${ methodName }" is an empty function.`);
            return this;
        };
    });
}
