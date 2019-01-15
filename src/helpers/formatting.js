import _d from './data';

/**
 * @param {string} value
 * @returns
 */
function camelize(value) {
    return value.replace(/^([A-Z])|[\s-]+(\w)/g, (match, p1, p2) => {
        if (p2) return p2.toUpperCase();

        return p1.toLowerCase();
    });
}

/**
 * @param {string} value
 * @param {string} separator
 * @returns
 */
function decamelize(value, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;

    return value
        .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
        .toLowerCase();
}

/**
 * @param {number | string} value
 * @returns
 */
function addThousandSeparators(value) {
    const isNaN = Number.isNaN(value);
    const isNegative = value < 0;

    value = Math.round(value * 100) / 100;

    if (!isNaN) {
        const numbers = value.toString().replace('-', '').replace('.', ',').split('');
        numbers.reverse();

        const formatedArray = [];

        let i = 1;
        numbers.forEach(number => {
            formatedArray.push(number);

            if (i % 3 === 0) {
                formatedArray.push(' ');
            }

            i += 1;
        });

        let formated = isNegative ? '-' : '';
        formated += formatedArray.reverse().join('').trim();

        return formated;
    } else {
        return '-';
    }
}

/**
 * @param {number} value
 * @param {number} [decimalsCount=2]
 * @returns
 */
function limitDecimals(value, decimalsCount = 2) {
    const afterDotCount = 10 ** decimalsCount;

    return (Math.round(value * afterDotCount) / afterDotCount).toString().replace('.', ',');
}

/**
 * @param {bool | string} value
 * @param {string} [trueValue='Ano']
 * @param {string} [falseValue='Ne']
 * @returns
 */
function boolToLabel(value, trueValue = 'Ano', falseValue = 'Ne') {
    return value.toString() === 'true' ? trueValue : falseValue;
}

/**
 *
 *
 * @param {number | string} value
 * @returns
 */
function formatCurrency(value) {
    // eslint-disable-next-line no-useless-escape
    const split = value.toString().split(/[\.,]/);
    const integer = split[0];
    let decimals = split[1] || '00';
    const decimalsLength = !_d.isValid(decimals) ? 0 : decimals.length;

    if (decimalsLength < 2) {
        decimals = `${decimals}${'0'.repeat(2 - decimalsLength)}`;
    } else if (decimalsLength > 2) {
        decimals = Math.round(decimals / (10 ** (decimalsLength - 2)));
    }

    return `${addThousandSeparators(integer)},${decimals} Kč`;
}

export default {
    camelize,
    decamelize,
    addThousandSeparators,
    limitDecimals,
    boolToLabel,
    formatCurrency
};
