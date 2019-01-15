import isEmpty from 'ramda/src/isEmpty';
import equals from 'ramda/src/equals';

/**
 * @param {Object} object
 * @returns
 */
function objectToArray(object) {
    const flattened = [];

    Object.keys(object).forEach(key => {
        const node = object[key];

        if (typeof node === 'object' && node.length !== undefined) {
            flattened.push(...objectToArray(node));
        } else {
            flattened.push(node);
        }
    });

    return flattened;
}

/**
 * @param {string | number} value
 * @returns
 */
function isNumber(value) {
    const intPatt = /^-?\d+$/;
    const floatPatt = /^-?\d+.?\d+$/;

    return intPatt.test(value) || floatPatt.test(value);
}

/**
 * @param {any | any[]} values
 * @returns
 */
function isValid(...values) {
    return Object.values(values.map(value => isValid_validate(value))).reduce((x, y) => x && y);
}

/**
 * @param {any} value
 * @returns
 */
function isValid_validate(value) {
    const isUndefined = value === undefined;
    const isUndefinedString = String(value) === 'undefined';
    const isNull = value === null;
    const isNullString = String(value) === 'null';
    const isEmptyString = value === '';
    const isSpaceString = value === ' ';
    const isNoneString = value === 'none';
    const isOther = isEmpty(value);

    return !(isUndefined || isUndefinedString || isNull || isNullString || isEmptyString || isSpaceString || isNoneString || isOther);
}

/**
 * @param {Objects[]} objects
 * @returns
 */
function objectsAreDifferent(...objects) {
    return !equals(...objects);
}

/**
 * @param {Array} [array=[]]
 * @param {any} value
 * @returns
 */
function push(array = [], value) {
    array.push(value);

    return array;
}

/**
 * @param {Object} object
 * @returns
 */
function getIterableObject(object) {
    return Object.entries(object).map(entry => entry[1]);
}

export default {
    objectToArray,
    isNumber,
    isValid,
    objectsAreDifferent,
    push,
    getIterableObject
};
