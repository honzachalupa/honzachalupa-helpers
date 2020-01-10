import isEmpty from 'ramda/src/isEmpty';
import equals from 'ramda/src/equals';

const isValid_validate = value => {
    const isUndefined = value === undefined;
    const isUndefinedString = String(value) === 'undefined';
    const isNull = value === null;
    const isNullString = String(value) === 'null';
    const isNaN = Number.isNaN(value);
    const isEmptyString = value === '';
    const isSpaceString = value === ' ';
    const isNoneString = value === 'none';
    const isOther = isEmpty(value);

    return !(isUndefined || isUndefinedString || isNull || isNullString || isNaN || isEmptyString || isSpaceString || isNoneString || isOther);
};

const objectToArray = object => {
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
};

const push = (array = [], value) => {
    array.push(value);

    return array;
};

const objectsAreDifferent = (...objects) => !equals(...objects);
const getIterableObject = object => Object.entries(object).map(entry => entry[1]);
const switch_ = (value, cases) => cases[Object.keys(cases).find(key => key === value)];
const isNumber = value => /^-?\d+$/.test(value) || /^-?\d+.?\d+$/.test(value);
const getSelectLabel = (optionId, options) => options.find(option => option.id === optionId).label;

export const isValid = (...values) => Object.values(values.map(value => isValid_validate(value))).reduce((x, y) => x && y);

export default {
    objectToArray,
    isNumber,
    isValid,
    objectsAreDifferent,
    push,
    getIterableObject,
    switch: switch_,
    getSelectLabel
};
