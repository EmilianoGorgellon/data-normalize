let util = require("util");
module.exports = obj => {
    console.log(util.inspect(obj, false, 6, true))
}