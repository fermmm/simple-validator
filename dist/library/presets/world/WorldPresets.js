"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorldPresets = /** @class */ (function () {
    function WorldPresets(validation) {
        this.validation = validation;
    }
    /**
     * Email validator preset. Does not report error details, only if it's valid or not.
     *
     * @param autocorrect Deprecated parameter. This method does not support autocorrect.
     */
    WorldPresets.prototype.email = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        // tslint:disable-next-line:max-line-length
        return this.validation.customRegex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    /**
     * @deprecated Deprecated. Use email() instead.
     */
    WorldPresets.prototype.emailStrict = function () {
        // tslint:disable-next-line:max-line-length
        return this.email();
    };
    WorldPresets.prototype.nameOrLastName = function (autoCorrect) {
        if (autoCorrect === void 0) { autoCorrect = true; }
        return this.validation
            .noNumbersAllowed(autoCorrect)
            .noInvalidSpacesAllowed(autoCorrect)
            .noSpacesAllowed(autoCorrect)
            .noSpecialCharactersAllowed(true, null, autoCorrect)
            .maxChars(100, autoCorrect)
            .minWords(1)
            .maxWords(1, autoCorrect)
            .wordsShouldStartWithUpperCase(autoCorrect);
    };
    WorldPresets.prototype.nameComplete = function (autoCorrect, minWords, maxWords) {
        if (autoCorrect === void 0) { autoCorrect = true; }
        if (minWords === void 0) { minWords = 2; }
        if (maxWords === void 0) { maxWords = 5; }
        return this.validation
            .noNumbersAllowed(autoCorrect)
            .noInvalidSpacesAllowed(autoCorrect)
            .noSpecialCharactersAllowed(true, null, autoCorrect)
            .maxChars(230, autoCorrect)
            .minWords(minWords)
            .maxWords(maxWords, autoCorrect)
            .wordsShouldStartWithUpperCase(autoCorrect);
    };
    return WorldPresets;
}());
exports.WorldPresets = WorldPresets;
