import numeral from 'numeral';
import { isValid } from './data';

numeral.register('locale', 'cs', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: 'Kč'
    }
});

numeral.locale('cs');

const getUnitSymbol = (value, units) => {
    switch (units) {
        case 'currency':
            return ' Kč';
        case 'years':
            if (value === 1) {
                return ' rok';
            } else if (value < 5) {
                return ' roky';
            } else {
                return ' let';
            }
        case 'days':
            if (value === 1) {
                return ' den';
            } else if (value < 5) {
                return ' dny';
            } else {
                return ' dnů';
            }
        case 'adults':
            if (value === 1) {
                return ' dospělý';
            } else if (value <= 4) {
                return ' dospělí';
            } else {
                return ' dospělých';
            }
        case 'childrens':
            if (value === 1) {
                return ' dítě';
            } else if (value < 5) {
                return ' děti';
            } else {
                return ' dětí';
            }
        case 'percents':
            return '%';
        case 'pieces':
            return ' ks';
        default:
            return '';
    }
};

const boolToLabel = (value, trueLabel = window.helpersConfig.localization.YES, falseLabel = window.helpersConfig.localization.NO) => value.toString() === 'true' ? trueLabel : falseLabel;

const formatValue = (value = 0, units = null, forceShowDecimals = false) => {
    if (!isValid(value)) {
        value = 0;
    }

    let formatted = value.toString();

    if (units === 'percents') {
        formatted = parseFloat(formatted.replace(',', '.'));
        formatted = numeral(formatted).format('0,000.00').replace(/0*$/, '').replace(/,$/, '');
    } else if (units === 'boolean') {
        return boolToLabel(formatted);
    } else {
        formatted = parseFloat(formatted.replace(',', '.'));

        formatted = forceShowDecimals ?
            numeral(formatted).format('0,000.00').replace(/0*$/, '').replace(/,$/, '') :
            numeral(formatted).format('0,000');
    }

    return `${formatted}${getUnitSymbol(value, units)}`;
};

const camelize = value => value.replace(/^([A-Z])|[\s-]+(\w)/g, (match, p1, p2) => (p2 || p1).toLowerCase());
const decamelize = (value, separator = '_') => value.replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`).replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`).toLowerCase();
const formatCurrency = value => `${formatValue(value)}${getUnitSymbol(value, 'currency')}`;
const removeZeros = (value) => value.replace(/0+/g, '');

export default {
    camelize,
    decamelize,
    boolToLabel,
    formatValue,
    getUnitSymbol,
    formatCurrency,
    removeZeros
};
