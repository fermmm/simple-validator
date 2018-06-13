"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ErrorTexts_1 = require("../strings/ErrorTexts");
var StringTools_1 = require("../tools/StringTools");
var ContentValidators = /** @class */ (function () {
    function ContentValidators() {
    }
    ContentValidators.shouldContain = function (validation, substring, maxAllowed) {
        if (maxAllowed === void 0) { maxAllowed = null; }
        if (validation.result.text.includes(substring)) {
            if (maxAllowed != null) {
                if (validation.result.text.split(substring).length - 1 <= maxAllowed) {
                    return validation;
                }
            }
            else {
                return validation;
            }
        }
        var errorText = substring.length === 1 ?
            ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_SINGLE :
            ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_MULTIPLE;
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(StringTools_1.StringTools.specialCharReplace(errorText, substring)),
            locations: [],
        });
        return validation;
    };
    // tslint:disable-next-line:max-line-length
    ContentValidators.shouldContainAfter = function (validation, characterOrText, referenceCharacterOrText, minDistance) {
        if (minDistance === void 0) { minDistance = 1; }
        var substringLocation = -1;
        var allSubstringLocations = StringTools_1.StringTools.returnSubstringMatchingIndexes(validation.result.text, characterOrText);
        if (allSubstringLocations.length > 0) {
            substringLocation = allSubstringLocations[allSubstringLocations.length - 1];
        }
        var referenceSubstringLocation = validation.result.text.indexOf(referenceCharacterOrText);
        var distance = Math.abs(substringLocation - referenceSubstringLocation);
        if (substringLocation !== -1 &&
            referenceSubstringLocation !== -1 &&
            referenceSubstringLocation < substringLocation &&
            distance >= minDistance) {
            return validation;
        }
        var errorText = StringTools_1.StringTools.specialCharReplaceSpecific(ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_AFTER, "~", characterOrText);
        errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "&", referenceCharacterOrText);
        errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "#", minDistance.toString());
        var locationsIndexes = [];
        if (substringLocation !== -1) {
            locationsIndexes.push(substringLocation);
        }
        if (referenceSubstringLocation !== -1) {
            locationsIndexes.push(referenceSubstringLocation);
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(errorText),
            locations: locationsIndexes,
        });
        return validation;
    };
    // tslint:disable-next-line:max-line-length
    ContentValidators.shouldContainBefore = function (validation, characterOrText, referenceCharacterOrText, minDistance) {
        if (minDistance === void 0) { minDistance = 1; }
        var substringLocation = -1;
        var allSubstringLocations = StringTools_1.StringTools.returnSubstringMatchingIndexes(validation.result.text, characterOrText);
        if (allSubstringLocations.length > 0) {
            substringLocation = allSubstringLocations[0];
        }
        var referenceSubstringLocation = validation.result.text.lastIndexOf(referenceCharacterOrText);
        var distance = Math.abs(substringLocation - referenceSubstringLocation);
        if (substringLocation !== -1 &&
            referenceSubstringLocation !== -1 &&
            referenceSubstringLocation > substringLocation &&
            distance >= minDistance) {
            return validation;
        }
        // tslint:disable-next-line:max-line-length
        var errorText = StringTools_1.StringTools.specialCharReplaceSpecific(ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_BEFORE, "~", characterOrText);
        errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "&", referenceCharacterOrText);
        errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "#", minDistance.toString());
        var locationsIndexes = [];
        if (substringLocation !== -1) {
            locationsIndexes.push(substringLocation);
        }
        if (referenceSubstringLocation !== -1) {
            locationsIndexes.push(referenceSubstringLocation);
        }
        validation.result.isValid = false;
        validation.result.errors.push({
            description: __1.getErrorInLanguage(errorText),
            locations: locationsIndexes,
        });
        return validation;
    };
    // tslint:disable-next-line:max-line-length
    ContentValidators.shouldContainAt = function (validation, textOrCharacter, positionIndex, fromTheBeginning, autocorrect) {
        if (fromTheBeginning === void 0) { fromTheBeginning = true; }
        if (autocorrect === void 0) { autocorrect = true; }
        var positionIndexFinal = positionIndex;
        if (!fromTheBeginning) {
            positionIndexFinal = validation.result.text.length - 1 - positionIndex;
        }
        if (StringTools_1.StringTools.containsAt(validation.result.text, textOrCharacter, positionIndexFinal)) {
            return validation;
        }
        if (!autocorrect || validation.result.text.length - 2 < positionIndexFinal || !fromTheBeginning) {
            var errorText = fromTheBeginning ?
                ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_AT_FROM_BEGGINING :
                ErrorTexts_1.ErrorTexts.SHOULD_CONTAIN_AT_FROM_BOTTOM;
            errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "~", (positionIndex + 1).toString());
            errorText = StringTools_1.StringTools.specialCharReplaceSpecific(errorText, "&", textOrCharacter);
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(errorText),
                locations: [positionIndexFinal],
            });
        }
        else {
            validation.result.text = StringTools_1.StringTools.insert(validation.result.text, textOrCharacter, positionIndexFinal);
        }
        return validation;
    };
    ContentValidators.passwordConfirmation = function (validation, password) {
        var match = false;
        if (typeof password === "string") {
            match = validation.result.text === password;
        }
        else {
            match = validation.result.text === password();
        }
        if (!match) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.CONFIRM_PASSWORD),
                locations: [],
            });
        }
        return validation;
    };
    ContentValidators.emailConfirmation = function (validation, email) {
        var match = false;
        if (typeof email === "string") {
            match = validation.result.text === email;
        }
        else {
            match = validation.result.text === email();
        }
        if (!match) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.CONFIRM_EMAIL),
                locations: [],
            });
        }
        return validation;
    };
    ContentValidators.customRegex = function (validation, regex, invert) {
        if (invert === void 0) { invert = false; }
        var result = regex.test(validation.result.text);
        if (invert) {
            result = !result;
        }
        if (!result) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: __1.getErrorInLanguage(ErrorTexts_1.ErrorTexts.CUSTOM_REGEX),
                locations: [],
            });
        }
        return validation;
    };
    return ContentValidators;
}());
exports.ContentValidators = ContentValidators;
