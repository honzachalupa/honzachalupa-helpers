/**
 * @param {string | number} key
 * @param {string | number} value
 * @param {number} [exdays=30]
 */
const setCookie = (key, value, exdays = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value};${expires};path=/`;
};

/**
 * @param {string | number} key
 * @returns
 */
const readCookieString = key => {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.includes(name)) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
};

/**
 * @param {string | number} key
 * @returns
 */
const getCookie = key => {
    const cookie = readCookieString(key);

    return (/^{.*}$/.test(cookie)) ? JSON.parse(cookie) : cookie;
};

/**
 * @returns
 */
const getBrowserName = () => navigator.userAgent.includes('Edge') ? 'Edge' :
    navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR') ? 'Opera' :
        navigator.userAgent.includes('Chrome') ? 'Chrome' :
            navigator.userAgent.includes('Safari') ? 'Safari' :
                navigator.userAgent.includes('Firefox') ? 'Firefox' : 'IE';

/**
 * @returns
 */
const getPlatformName = () => {
    const { userAgent, platform } = window.navigator;

    return ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].includes(platform) ? 'Mac OS' :
        ['iPhone', 'iPad', 'iPod'].includes(platform) ? 'iOS' :
            ['Win32', 'Win64', 'Windows', 'WinCE'].includes(platform) ? 'Windows' :
                /Android/.test(userAgent) ? 'Android' :
                    /Linux/.test(platform) ? 'Linux' : 'unknown';
};

/**
 * @param {function} callback
 * @param {number} delay
 * @returns
 */
const throttler = (callback, delay) => {
    let lastCall = 0;

    return (...args) => {
        const now = (new Date()).getTime();

        if (now - lastCall < delay) {
            return null;
        }

        lastCall = now;

        return callback(...args);
    };
};

/**
 * @param {function} callback
 * @param {boolean} [runOnMount=true]
 * @returns
 */
const onWindowResize = (callback, runOnMount = true) => {
    if (typeof callback === 'function') {
        const resizeEvent = throttler(() => {
            const { clientWidth: width, clientHeight: height } = document.body;

            const isLandscape = width > height;
            const orientation = isLandscape ? 'landscape' : 'portrait';
            const aspectRatio = isLandscape ? width / height : height / width;
            const numberOfPixels = width * height;

            callback({
                width,
                height,
                orientation,
                aspectRatio,
                numberOfPixels
            });
        }, 200);

        const mount = () => {
            if (runOnMount) {
                resizeEvent();
            }

            window.addEventListener('resize', resizeEvent);
        };

        const unmount = () => {
            window.removeEventListener('resize', resizeEvent);
        };

        return {
            mount,
            unmount
        };
    } else {
        throw new Error('Callback must be a function.');
    }
};

export default {
    setCookie,
    getCookie,
    readCookieString,
    getBrowserName,
    getPlatformName,
    onWindowResize,
    throttler
};
