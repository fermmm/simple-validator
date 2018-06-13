"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CountryPresets_1 = require("./countrySpecific/CountryPresets");
var WorldPresets_1 = require("./world/WorldPresets");
var Presets = /** @class */ (function () {
    function Presets(validation) {
        this.world = new WorldPresets_1.WorldPresets(validation);
        this.countrySpecific = new CountryPresets_1.CountryPresets(validation);
    }
    return Presets;
}());
exports.Presets = Presets;
