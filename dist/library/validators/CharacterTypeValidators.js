"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ErrorTexts_1 = require("../strings/ErrorTexts");
var StringTools_1 = require("../tools/StringTools");
var CharacterTypeValidators = /** @class */ (function () {
    function CharacterTypeValidators() {
    }
    CharacterTypeValidators.noLettersAllowed = function (validation, autocorrect) {
        var matchingIndexes = StringTools_1.StringTools.returnMatchingIndexes(validation.result.text, /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/);
        if (matchingIndexes.length === 0) {
            return validation;
        }
        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.NO_LETTERS),
                locations: matchingIndexes,
            });
        }
        else {
            validation.result.text = StringTools_1.StringTools.removeCharacters(validation.result.text, matchingIndexes);
        }
        return validation;
    };
    CharacterTypeValidators.noNumbersAllowed = function (validation, autocorrect) {
        var matchingIndexes = StringTools_1.StringTools.returnMatchingIndexes(validation.result.text, new RegExp("^[0-9]+$"));
        if (matchingIndexes.length === 0) {
            return validation;
        }
        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.NO_NUMBERS),
                locations: matchingIndexes,
            });
        }
        else {
            validation.result.text = StringTools_1.StringTools.removeCharacters(validation.result.text, matchingIndexes);
        }
        return validation;
    };
    CharacterTypeValidators.noSpacesAllowed = function (validation, autocorrect) {
        var spacesLocations = StringTools_1.StringTools.returnSpacesLocations(validation.result.text);
        if (spacesLocations.length === 0) {
            return validation;
        }
        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.NO_SPACES),
                locations: spacesLocations,
            });
        }
        else {
            validation.result.text = StringTools_1.StringTools.removeCharacters(validation.result.text, spacesLocations);
        }
        return validation;
    };
    CharacterTypeValidators.specialCharacters = function (validation, allowUnicode, exceptions, autocorrect) {
        if (allowUnicode === void 0) { allowUnicode = true; }
        if (exceptions === void 0) { exceptions = null; }
        if (autocorrect === void 0) { autocorrect = true; }
        var regExp = allowUnicode ? new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]+$/) : new RegExp(/[a-zA-Z0-9 ]+$/);
        var notMatchingIndexes = StringTools_1.StringTools.returnNotMatchingIndexes(validation.result.text, regExp, exceptions);
        if (notMatchingIndexes.length === 0) {
            return validation;
        }
        if (!autocorrect) {
            var errorText = void 0;
            if (exceptions != null && exceptions.length > 0) {
                var exceptionChars = "";
                for (var _i = 0, exceptions_1 = exceptions; _i < exceptions_1.length; _i++) {
                    var exceptionChar = exceptions_1[_i];
                    exceptionChars += exceptionChar + " ";
                }
                errorText = StringTools_1.StringTools.specialCharReplace(ErrorTexts_1.ErrorTexts.NO_SPECIAL_CHARS_EXCEPTION, exceptionChars);
            }
            else {
                errorText = ErrorTexts_1.ErrorTexts.NO_SPECIAL_CHARS;
            }
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(errorText),
                locations: notMatchingIndexes,
            });
        }
        else {
            validation.result.text = StringTools_1.StringTools.removeCharacters(validation.result.text, notMatchingIndexes);
        }
        return validation;
    };
    CharacterTypeValidators.invalidSpaces = function (validation, autoCorrect) {
        var doubleSpacesLocations = StringTools_1.StringTools.returnDoubleSpacesLocations(validation.result.text);
        var spaceAtTheBeginning = false;
        if (/\s+/.test(validation.result.text[0])) {
            spaceAtTheBeginning = true;
        }
        if (doubleSpacesLocations.length === 0 && spaceAtTheBeginning === false) {
            return validation;
        }
        if (autoCorrect) {
            var doubleSpacesLocationsUpdated = doubleSpacesLocations;
            for (var _i = 0, doubleSpacesLocations_1 = doubleSpacesLocations; _i < doubleSpacesLocations_1.length; _i++) {
                var l = doubleSpacesLocations_1[_i];
                doubleSpacesLocationsUpdated = StringTools_1.StringTools.returnDoubleSpacesLocations(validation.result.text);
                if (doubleSpacesLocationsUpdated.length > 0) {
                    validation.result.text = StringTools_1.StringTools.removeAt(validation.result.text, doubleSpacesLocations[0]);
                }
            }
            if (/\s+/.test(validation.result.text[0])) {
                validation.result.text = StringTools_1.StringTools.removeAt(validation.result.text, 0);
            }
            return validation;
        }
        var errorLocations = [];
        if (doubleSpacesLocations.length > 0) {
            errorLocations = doubleSpacesLocations;
        }
        if (spaceAtTheBeginning) {
            errorLocations.push(0);
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.NO_INVALID_SPACES),
            locations: errorLocations,
        });
        return validation;
    };
    CharacterTypeValidators.wordsShouldStartWithUpperCase = function (validation, autocorrect) {
        var wordsLocations = StringTools_1.StringTools.returnWordsFirstLetterLocations(validation.result.text);
        var problemsLocations = [];
        for (var _i = 0, wordsLocations_1 = wordsLocations; _i < wordsLocations_1.length; _i++) {
            var wordLocation = wordsLocations_1[_i];
            if (validation.result.text[wordLocation] === validation.result.text[wordLocation].toUpperCase()) {
                continue;
            }
            problemsLocations.push(wordLocation);
            if (autocorrect) {
                validation.result.text = StringTools_1.StringTools.replaceAt(validation.result.text, wordLocation, validation.result.text[wordLocation].toUpperCase());
            }
        }
        if (!autocorrect && problemsLocations.length > 0) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.FIRST_LETTER_UPPERCASE),
                locations: problemsLocations,
            });
        }
        return validation;
    };
    return CharacterTypeValidators;
}());
exports.CharacterTypeValidators = CharacterTypeValidators;
