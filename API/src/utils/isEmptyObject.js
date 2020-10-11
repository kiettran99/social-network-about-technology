const isEmptyObject = (obj) => {
    for (var x in obj) { return false };
    return true;
};

module.exports = isEmptyObject;