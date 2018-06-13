"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ErrorTexts_1 = require("../strings/ErrorTexts");
var StringTools_1 = require("../tools/StringTools");
var StringMatchingValidators = /** @class */ (function () {
    function StringMatchingValidators() {
    }
    StringMatchingValidators.shouldStartWith = function (validation, textToMatch, autocorrect) {
        if (validation.result.text.startsWith(textToMatch)) {
            return validation;
        }
        if (!autocorrect || validation.result.text.length < textToMatch.length) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.START_WITH, textToMatch)),
                locations: [0],
            });
        }
        else {
            validation.result.text = textToMatch + validation.result.text;
        }
        return validation;
    };
    StringMatchingValidators.shouldEndWith = function (validation, textToMatch) {
        if (validation.result.text.endsWith(textToMatch)) {
            return validation;
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.END_WITH, textToMatch)),
            locations: [validation.result.text.length - 1],
        });
        return validation;
    };
    return StringMatchingValidators;
}());
exports.StringMatchingValidators = StringMatchingValidators;
