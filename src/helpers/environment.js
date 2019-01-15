/* globals __BUILDTARGET__ */

/**
 * @returns
 */
function isDevEnvironment() {
    return __BUILDTARGET__ === 'dev';
}

/**
 * @returns
 */
function isProdEnvironment() {
    return __BUILDTARGET__ === 'prod';
}

export default {
    isDevEnvironment,
    isProdEnvironment
};
