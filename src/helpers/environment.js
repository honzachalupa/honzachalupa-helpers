/* globals __BUILDTARGET__ */

const isDevEnvironment = () => __BUILDTARGET__ === 'dev';
const isProdEnvironment = () => __BUILDTARGET__ === 'prod';

export default {
    isDevEnvironment,
    isProdEnvironment
};
