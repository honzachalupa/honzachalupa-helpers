window.helpersConfig = {
    localization: {
        YES: 'Yes',
        NO: 'No'
    },
    serviceWorker: {
        path: 'sw.js',
        scope: '/'
    }
};

export function setOptions(options, showInitMessage = true) {
    if (showInitMessage) {
        console.log('[@honzachalupa/helpers] Options:', options);
    }

    window.helpersConfig = { ...window.helpersConfig, ...options };
}

export {
    default as _a,
    default as app
} from './helpers/app';

export {
    default as _b,
    default as browser
} from './helpers/browser';

export {
    default as Context
} from './helpers/context';

export {
    default as _d,
    default as data
} from './helpers/data';

export {
    default as _e,
    default as environment
} from './helpers/environment';

export {
    default as _f,
    default as formatting
} from './helpers/formatting';
