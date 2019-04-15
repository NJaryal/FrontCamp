const oldJSONData = require('../Data.json')
module.exports = function(source) {
    for (const key in oldJSONData.employees) {
        if (oldJSONData.hasOwnProperty(key) == isNaN) {
          console.log("Strings Data");   
        }else{
          console.log("Number");
        }
      }
    return source;
}