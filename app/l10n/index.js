var store = require('../utils/store');

exports.cn = require('./cn');

// set the current lang
exports.setLang = function(lang) {
    exports.current = exports[lang];
    exports.list.forEach(function(item) {
        item.isCurrent = (item.id === lang);
    });
    exports.currentId = lang;
};
exports.setLang('cn'); // default lang before app loads


// get the raw value of a key (useful for when it's an object) - defaults to English
exports.get = function(category, key) {
    if (!key) {
        return exports.current[category] || exports.en[category] || category;
    }
    if (exports.current[category] && exports.current[category][key]) {
        return exports.current[category][key];
    }
    if (exports.en[category] && exports.en[category][key]) {
        return exports.en[category][key];
    }
    return key;
};

// check if the translation exists in the current language or in English
exports.has = function(category, key) {
    if (!key) {
        return !!(exports.current[category] || exports.en[category]);
    }
    return !!((exports.current[category] && exports.current[category][key]) || (exports.en[category] && exports.en[category][key]));
};

// translate a key, using the given placeholder values if applicable, defaults to the English translation, or to the key if none
exports.translate = function(category, key, values) {
    var str = exports.get(category, key);
    if (values && values.length) {
        values.forEach(function(item) {
            str = str.replace('%s', item); // replace the first occurence only so that it matches the array of values
        });
    }
    return str;
};