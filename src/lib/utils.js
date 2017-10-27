export const isInt = (val) => !isNaN(val)
    && eval(val)
        .toString().length
    === parseInt(eval(val))
        .toString().length;


export const isFloat = (val) => !isNaN(val)
    && !isInt(eval(val))
    && val.toString().length > 0;

export const isColor = (val) => /^#?[0-9A-F]{6}$/i.test(val);

export const autoCast = (value) => {
    if (!value) {
        return value;
    }

    if (isColor(value)) {
        return ('#' + value).replace('##', '#');
    }

    if (isInt(value)) {
        return parseInt(value, 10);
    }

    if (isFloat(value)) {
        return parseFloat(value);
    }

    if (value.toLowerCase() === 'true') {
        return true;
    }

    if (value.toLowerCase() === 'false') {
        return false;
    }

    return value;
};


export const castString = (str) => {
    if (typeof str !== 'string' && !(str instanceof String)) {
        str = '' + str;
    }

    return str.toLowerCase();
};
