"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonLogic = void 0;
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var json_logic_js_1 = tslib_1.__importDefault(require("json-logic-js"));
exports.jsonLogic = json_logic_js_1.default;
var date_fns_1 = require("date-fns");
var operators_1 = require("./operators");
var DURATION_UNITS;
(function (DURATION_UNITS) {
    DURATION_UNITS["MILLISECONDS"] = "milliseconds";
    DURATION_UNITS["SECONDS"] = "seconds";
    DURATION_UNITS["MINUTES"] = "minutes";
    DURATION_UNITS["HOURS"] = "hours";
    DURATION_UNITS["DAYS"] = "days";
    DURATION_UNITS["MONTHS"] = "months";
    DURATION_UNITS["YEARS"] = "years";
})(DURATION_UNITS || (DURATION_UNITS = {}));
var differenceInDuration = function (dateStrings, unit) {
    var date1 = (0, date_fns_1.parseISO)(dateStrings[0]);
    var date2 = (0, date_fns_1.parseISO)(dateStrings[1]);
    var isSomeDateInvalid = [date1, date2].find(function (d) { return isNaN(d.getTime()); });
    if (isSomeDateInvalid) {
        return 0;
    }
    switch (unit) {
        case DURATION_UNITS.MILLISECONDS:
            return -(0, date_fns_1.differenceInMilliseconds)(date1, date2);
        case DURATION_UNITS.SECONDS:
            return -(0, date_fns_1.differenceInSeconds)(date1, date2);
        case DURATION_UNITS.MINUTES:
            return -(0, date_fns_1.differenceInMinutes)(date1, date2);
        case DURATION_UNITS.HOURS:
            return -(0, date_fns_1.differenceInHours)(date1, date2);
        case DURATION_UNITS.DAYS:
            return -(0, date_fns_1.differenceInDays)(date1, date2);
        case DURATION_UNITS.MONTHS:
            return -(0, date_fns_1.differenceInMonths)(date1, date2);
        case DURATION_UNITS.YEARS:
            return -(0, date_fns_1.differenceInYears)(date1, date2);
    }
    return 0;
};
operators_1.lodashOperators.forEach(function (name) { return json_logic_js_1.default.add_operation("_".concat(name), lodash_1.default[name]); });
json_logic_js_1.default.add_operation('_isPastDate', function (date) {
    return (0, date_fns_1.isPast)(new Date(date));
});
json_logic_js_1.default.add_operation('_isFutureDate', function (date) {
    return (0, date_fns_1.isFuture)(new Date(date));
});
json_logic_js_1.default.add_operation('_getDate', function (date) {
    return new Date(date).toISOString();
});
json_logic_js_1.default.add_operation('_gteDate', function (dateStrings, durationUnits) {
    return differenceInDuration(dateStrings, durationUnits[1]) >= durationUnits[0];
});
json_logic_js_1.default.add_operation('_gtDate', function (dateStrings, durationUnits) {
    return differenceInDuration(dateStrings, durationUnits[1]) > durationUnits[0];
});
json_logic_js_1.default.add_operation('_lteDate', function (dateStrings, durationUnits) {
    return differenceInDuration(dateStrings, durationUnits[1]) <= durationUnits[0];
});
json_logic_js_1.default.add_operation('_ltDate', function (dateStrings, durationUnits) {
    return differenceInDuration(dateStrings, durationUnits[1]) < durationUnits[0];
});
json_logic_js_1.default.add_operation('_eqDate', function (dateStrings, durationUnits) {
    return differenceInDuration(dateStrings, durationUnits[1]) === durationUnits[0];
});
json_logic_js_1.default.add_operation('_nonZeroMin', function (a) {
    return Math.min.apply(Math, a.filter(function (n) { return n !== 0; }));
});
json_logic_js_1.default.add_operation('_nonZeroMax', function (a) {
    return Math.max.apply(Math, a.filter(function (n) { return n !== 0; }));
});
json_logic_js_1.default.add_operation('_neq', function (a, b) { return a != b; });
