const validate = require("validate.js")
const moment = require("moment")
const Class = require("../models/Class")

validate.extend(validate.validators.datetime, {

    parse: function (value, options) {
        let format = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
        if (options.dateOnly) {
            format = ["YYYY-MM-DD", "YYYY-M-D", "x"];
        }
        return +moment.utc(value, format, true);
    },
    format: function (value, options) {
        const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-M-D";
        return moment.utc(value).format(format);
    }
});

validate.validators.classExits =async function (value) {
    const c = await Class.findByPk(value);
    if(c){
        return;
    }
    return "is not exits"
}