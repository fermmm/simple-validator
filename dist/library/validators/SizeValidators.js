"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ErrorTexts_1 = require("../strings/ErrorTexts");
var StringTools_1 = require("../tools/StringTools");
var SizeValidators = /** @class */ (function () {
    function SizeValidators() {
    }
    SizeValidators.minChars = function (validation, charsAmount) {
        if (validation.result.text.length >= charsAmount) {
            return validation;
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.MIN_CHARS, charsAmount.toString())),
            locations: [],
        });
        return validation;
    };
    SizeValidators.maxChars = function (validation, charsAmount, autocorect) {
        if (validation.result.text.length <= charsAmount) {
            return validation;
        }
        if (!autocorect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.MAX_CHARS, charsAmount.toString())),
                locations: StringTools_1.StringTools.returnAllCharacterIndexesSince(validation.result.text, charsAmount),
            });
        }
        else {
            validation.result.text = validation.result.text.slice(0, -(validation.result.text.length - charsAmount));
        }
        return validation;
    };
    SizeValidators.minWords = function (validation, minimum) {
        var amountOfWords = validation.result.text.trim().split(/\s+/).length;
        if (!(minimum > 0 && amountOfWords < minimum)) {
            return validation;
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.MIN_WORDS, minimum.toString())),
            locations: [],
        });
        return validation;
    };
    SizeValidators.maxWords = function (validation, maximum, autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        var amountOfWords = validation.result.text.trim().split(/\s+/).length;
        if (!(maximum > 0 && amountOfWords > maximum)) {
            return validation;
        }
        var wordsLocations = StringTools_1.StringTools.returnWordsFirstLetterLocations(validation.result.text);
        if (autocorrect && wordsLocations.length > maximum) {
            validation.result.text = StringTools_1.StringTools.removeCharactersSince(validation.result.text, wordsLocations[maximum]);
            return validation;
        }
        var errorLocations = [];
        if (wordsLocations.length >= maximum) {
            errorLocations = StringTools_1.StringTools.returnAllCharacterIndexesSince(validation.result.text, wordsLocations[maximum]);
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.MAX_WORDS, maximum.toString())),
            locations: errorLocations,
        });
        return validation;
    };
    return SizeValidators;
}());
exports.SizeValidators = SizeValidators;
