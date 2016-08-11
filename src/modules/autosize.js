import {
    userAgent,
} from './util';

const { device, os } = userAgent;
const hdpi = devicePixelRatio > 1 ? 1 : 0;

const icon = {
    phone : {
        6 : {
            0 : {
                sizes : '57x57'
            },
            1 : {
                sizes : '114x114'
            },
        },
        7 : {
            0 : {
                sizes : '60x60'
            },
            1 : {
                sizes : '120x120'
            },
        },
    },
    pad : {
        6 : {
            0 : {
                sizes : '72x72'
            },
            1 : {
                sizes : '144x144'
            },
        },
        7 : {
            0 : {
                sizes : '76x76'
            },
            1 : {
                sizes : '152x152'
            },
        },
    },
};

let splash = {};
const width = 'device-width';
const height = 'device-height';
if (device == 'phone') {
    splash[width] = '320px';
    splash[height] = '480px';
    [
        {
            width : 320,
            height : 568,
        },
        {
            width : 375,
            height : 667,
        },
        {
            width : 414,
            height : 736,
        },
    ].forEach(function ( type ) {
        if (matchMedia(`(${ width }:${ type.width }px)and(${ height }:${ type.height }px)`).matches) {
            splash[width] = `${ type.width }px`;
            splash[height] = `${ type.height }px`;
        }
    });
} else {
    splash[width] = '768px';
    splash[height] = '1024px';
}
splash['-webkit-device-pixel-ratio'] = devicePixelRatio;

exports.autosize = function ( type ) {
    if (type == 'icon') {
        return icon[device][os][hdpi];
    }
    if (type == 'splash') {
        let result = [];
        for (let rule in splash) {
            result.push(`(${ rule }:${ splash[rule] })`);
        }
        if (device == 'ipad' || devicePixelRatio == 3) {
            if (matchMedia('(orientation:landscape)').matches) {
                result.push('(orientation:landscape)');
            } else {
                result.push('(orientation:portrait)');
            }
        }
        return result.join('and');
    }
};
