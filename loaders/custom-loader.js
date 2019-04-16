module.exports = function(source) {  
    const newValue = source.replace(/(.*\d)\:(\D*\s?\w.*\,?)|(.*\:(\s?)\d.*)/g, '')  
    return newValue;
}

