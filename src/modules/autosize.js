import {
    userAgent,
} from './util';

const { device, os } = userAgent;

// const autosize = matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? {
//     icon : {
//         iPad : {
//             'iOS≤6' : {},
//             'iOS≥7' : {},
//         },
//         iPod : {
//             'iOS≤6' : {},
//             'iOS≥7' : {},
//         },
//         iPhone : {
//             'iOS≤6' : {},
//             'iOS≥7' : {},
//         },
//     },
//     splash : {
//
//     },
// } : {
//
// };

// const type = media

exports.autosize = function ( type ) {
    // return autosize[[type, device, os].join('-')];
    return {};
};
