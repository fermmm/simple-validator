"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ar_1 = require("./ar/Ar");
var CountryPresets = /** @class */ (function () {
    function CountryPresets(validation) {
        this.ar = new Ar_1.Ar(validation);
    }
    return CountryPresets;
}());
exports.CountryPresets = CountryPresets;
