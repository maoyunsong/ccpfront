function prefix(key) {
    return 'ccprestige_' + key;
}

var storage = window.localStorage;

module.exports = {
    get: function(key) {
        return deserialize(storage.getItem(prefix(key)));
    },
    has: function(key) {
        return storage.getItem(prefix(key)) != null;
    },
    set: function(key, value) {
        if (value != null) {
            storage.setItem(prefix(key), serialize(value));
        } else {
            storage.removeItem(prefix(key));
        }

        return value;
    },
    remove: function(key) {
        storage.removeItem(prefix(key));
    },
    clear: function() {
        storage.clear();
    }
};

function serialize(obj) {
    return JSON.stringify(obj);
}

function deserialize(obj) {
    if (typeof obj !== 'string') {
        return undefined;
    }

    try {
        return JSON.parse(obj);
    } catch (err) {
        return undefined;
    }
}
