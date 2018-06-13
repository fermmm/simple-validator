"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorTexts_1 = require("./strings/ErrorTexts");
var CharacterTypeValidators_1 = require("./validators/CharacterTypeValidators");
var ContentValidators_1 = require("./validators/ContentValidators");
var SizeValidators_1 = require("./validators/SizeValidators");
var StringMatchingValidators_1 = require("./validators/StringMatchingValidators");
/**
 * Filter to set the language of the text returned and avoid big objects containing text for all languages.
 */
var LanguageFilter;
(function (LanguageFilter) {
    LanguageFilter["all"] = "all";
    LanguageFilter["english"] = "en";
    LanguageFilter["spanish"] = "es";
})(LanguageFilter = exports.LanguageFilter || (exports.LanguageFilter = {}));
/*
  This library validates content from input fields like: e-mail, name, ID, etc. Only works with strings so it's not tied to any
  framework. A visual version must be implemented on top of this tool.
  This tool tries to auto correct the text unless you specify to not do it, when there is an error returns information about
  it, a description and locations inside the string (when possible) to implmenet a visual underline in the input field indicating
  to the user the part of the text that should be corrected.
  The corrected text is avaiable in the text property.

  Usage example for a website url validation that only allows .com urls:

  const userWebsiteUrl = "LOL-XD";
  cost validationInfo = new Validation(userWebsiteUrl)
                          .minChars(7)
                          .noSpacesAllowed()
                          .shouldContain(".com");
  console.log(validationInfo.result);

  Prints the following object:

  {
    text: "LOL-XD",
    textOriginal: "LOL-XD",
    isValid: false,
    errors: [
              {
                description: {en: "Must contain the following: .com", es: "Debe contener lo siguiente: .com"}
                locations: []
              },
              {
                description: {en: "Must contain a minimum of 7 characters.", es: "Debe tener un mínimo de 7 caracteres."}
                locations: [6]
              }
            ]
  }

  Use the presets property to get common validations already made like e-mail validation.
  Use customRegex property only for complex validations.
*/
var Validation = /** @class */ (function () {
    /**
     * After calling the constructor you can start chaining methods to validate.
     * @param text The text to validate, usually an input field text.
     * @param canBeEmpty Report error when the field is empty. Default: false.
     */
    function Validation(text, canBeEmpty) {
        if (canBeEmpty === void 0) { canBeEmpty = false; }
        this.result = {
            errors: [],
            isValid: true,
            text: text,
            textOriginal: text,
        };
        if (!canBeEmpty && (text == null || !text.replace(/\s/g, "").length || text === "")) {
            this.result.isValid = false;
            this.result.errors.push({
                description: getErrorInLanguage(ErrorTexts_1.ErrorTexts.NO_EMPTY),
                locations: [],
            });
        }
    }
    /**
     * A minimum of characters that should be written.
     * @param charsAmount The amount of minimum characters allowed.
     */
    Validation.prototype.minChars = function (charsAmount) {
        return SizeValidators_1.SizeValidators.minChars(this, charsAmount);
    };
    /**
     * Maximum of characters that should be written.
     * @param autocorrect In this case autocorrect default value is false because when the user writes more than
     * what is needed he/she needs to be aware of what is happening otherwise it looks like the input field is bugged.
     */
    Validation.prototype.maxChars = function (charsAmount, autocorrect) {
        if (autocorrect === void 0) { autocorrect = false; }
        return SizeValidators_1.SizeValidators.maxChars(this, charsAmount, autocorrect);
    };
    /**
     * Minmum amount of words that should be written.
     */
    Validation.prototype.minWords = function (wordsAmount) {
        return SizeValidators_1.SizeValidators.minWords(this, wordsAmount);
    };
    /**
     * Max amount of words that should be written.
     */
    Validation.prototype.maxWords = function (wordsAmount, autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return SizeValidators_1.SizeValidators.maxWords(this, wordsAmount, autocorrect);
    };
    Validation.prototype.noNumbersAllowed = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.noNumbersAllowed(this, autocorrect);
    };
    Validation.prototype.noLettersAllowed = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.noLettersAllowed(this, autocorrect);
    };
    Validation.prototype.noSpacesAllowed = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.noSpacesAllowed(this, autocorrect);
    };
    /**
     * Invalid spaces means when the first character is a space or when there is one space after the other.
     * @param autocorrect Autocorrect removing concatenated spaces and first space or the problem should be returned as an error.
     */
    Validation.prototype.noInvalidSpacesAllowed = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.invalidSpaces(this, autocorrect);
    };
    /**
     * This validator only allows alphanumeric characters by dafault (only letters and numbers), you can specify exceptions.
     * @param allowUnicode If you have a string like "Âlvarö", it would reject it because of the letters Â and ö unless this is true (default).
     * @param exceptions A list of characters that are allowed.
     */
    Validation.prototype.noSpecialCharactersAllowed = function (allowUnicode, exceptions, autocorrect) {
        if (allowUnicode === void 0) { allowUnicode = true; }
        if (exceptions === void 0) { exceptions = null; }
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.specialCharacters(this, allowUnicode, exceptions, autocorrect);
    };
    Validation.prototype.shouldStartWith = function (textToMatch, autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return StringMatchingValidators_1.StringMatchingValidators.shouldStartWith(this, textToMatch, autocorrect);
    };
    Validation.prototype.shouldEndWith = function (textToMatch) {
        return StringMatchingValidators_1.StringMatchingValidators.shouldEndWith(this, textToMatch);
    };
    Validation.prototype.shouldContain = function (characterOrText, maxAllowed) {
        if (maxAllowed === void 0) { maxAllowed = null; }
        return ContentValidators_1.ContentValidators.shouldContain(this, characterOrText, maxAllowed);
    };
    /**
     * This validator only evaluates the first character of each word: If it's a letter in upper case is valid, if
     * it's not a letter is valid, if it's a letter in lowercase is invalid.
     */
    Validation.prototype.wordsShouldStartWithUpperCase = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return CharacterTypeValidators_1.CharacterTypeValidators.wordsShouldStartWithUpperCase(this, autocorrect);
    };
    /**
     * When a character or text inside string should be present after another one.
     * @param characterOrText The character or text that should be present after another one.
     * @param referenceCharacterOrText The character or text that should be before.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    Validation.prototype.shouldContainAfter = function (characterOrText, referenceCharacterOrText, minDistance) {
        if (minDistance === void 0) { minDistance = 1; }
        return ContentValidators_1.ContentValidators.shouldContainAfter(this, characterOrText, referenceCharacterOrText, minDistance);
    };
    /**
     * When a character or text inside string should be present before another one.
     * @param characterOrText The character or text that should be present before another one.
     * @param referenceCharacterOrText The character or text that should be after.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    Validation.prototype.shouldContainBefore = function (characterOrText, referenceCharacterOrText, minDistance) {
        if (minDistance === void 0) { minDistance = 1; }
        return ContentValidators_1.ContentValidators.shouldContainBefore(this, characterOrText, referenceCharacterOrText, minDistance);
    };
    /**
     * When a text or character should be in a specific position.
     * @param textOrCharacter The text or character that should be in a specific position.
     * @param positionIndex The position index in the string in where the text or character should be at.
     * @param fromTheBeginning If the position index should be counted from the beggining or from the bottom of the string. Warning: Autocorrect does not work if this is false.
     * @param autocorrect Autocorrect adding the text or character or if it should be returned as an error. If fromTheBeginning is false this does not work.
     */
    // tslint:disable-next-line:max-line-length
    Validation.prototype.shouldContainAt = function (textOrCharacter, positionIndex, fromTheBeginning, autocorrect) {
        if (fromTheBeginning === void 0) { fromTheBeginning = true; }
        if (autocorrect === void 0) { autocorrect = true; }
        return ContentValidators_1.ContentValidators.shouldContainAt(this, textOrCharacter, positionIndex, fromTheBeginning, autocorrect);
    };
    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "password not matching" error.
     * @param password It can be a string with the password to check for matching, also can be a function that returns a string.
     */
    Validation.prototype.passwordConfirmation = function (password) {
        return ContentValidators_1.ContentValidators.passwordConfirmation(this, password);
    };
    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "email not matching" error.
     * @param email It can be a string with the email to check for matching, also can be a function that returns a string.
     */
    Validation.prototype.emailConfirmation = function (email) {
        return ContentValidators_1.ContentValidators.emailConfirmation(this, email);
    };
    /**
     * With this filter you apply a custom regex. Useful in complex validations. The drawback is that this does not return useful
     * information in the error text and does not support auto correct.
     *
     * @param regex Regex expression.
     * @param invert To switch, so the regex allows or dissallows the validation.
     */
    Validation.prototype.customRegex = function (regex, invert) {
        if (invert === void 0) { invert = false; }
        return ContentValidators_1.ContentValidators.customRegex(this, regex, invert);
    };
    /**
     * Email validator rule. Does not report error details, only if it's valid or not.
     */
    Validation.prototype.isEmail = function () {
        // tslint:disable-next-line:max-line-length
        return ContentValidators_1.ContentValidators.customRegex(this, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    /**
     * Filter to set the language of the text returned and avoid big objects containing text for all languages. Default: "all".
     */
    Validation.languageFilter = LanguageFilter.all;
    return Validation;
}());
exports.Validation = Validation;
/**
 * Returns the error text in the configured language filter.
 */
function getErrorInLanguage(allLanguagesError) {
    if (Validation.languageFilter === LanguageFilter.all) {
        return allLanguagesError;
    }
    var result = {};
    result[Validation.languageFilter] = allLanguagesError[Validation.languageFilter];
    return result;
}
exports.getErrorInLanguage = getErrorInLanguage;
