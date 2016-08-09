exports.parseFilter = function ( expression ) {
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
