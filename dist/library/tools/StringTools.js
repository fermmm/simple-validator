"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var StringTools = /** @class */ (function () {
    function StringTools() {
    }
    StringTools.specialCharReplaceSpecific = function (originalErrorText, character, replaceBy) {
        var result = __assign({}, originalErrorText);
        for (var _i = 0, _a = Object.keys(result); _i < _a.length; _i++) {
            var key = _a[_i];
            result[key] = result[key].replace(character, replaceBy);
        }
        return result;
    };
    StringTools.specialCharReplace = function (originalErrorText, replaceBy) {
        return StringTools.specialCharReplaceSpecific(originalErrorText, "~", replaceBy);
    };
    StringTools.returnAllCharacterIndexes = function (text) {
        var result = [];
        for (var i = 0; i < text.length; i++) {
            result.push(i);
        }
        return result;
    };
    StringTools.returnAllCharacterIndexesSince = function (text, since) {
        if (since === void 0) { since = 0; }
        var result = [];
        for (var i = 0; i < text.length; i++) {
            if (i >= since) {
                result.push(i);
            }
        }
        return result;
    };
    StringTools.returnMatchingIndexes = function (text, regEx) {
        var result = [];
        for (var i = 0; i < text.length; i++) {
            if (regEx.test(text[i])) {
                result.push(i);
            }
        }
        return result;
    };
    StringTools.returnNotMatchingIndexes = function (text, regEx, exceptions) {
        if (exceptions === void 0) { exceptions = null; }
        var result = [];
        for (var i = 0; i < text.length; i++) {
            if (!regEx.test(text[i])) {
                if (exceptions != null && exceptions.indexOf(text[i]) !== -1) {
                    continue;
                }
                result.push(i);
            }
        }
        return result;
    };
    StringTools.returnSubstringMatchingIndexes = function (text, substringToFind) {
        if (!substringToFind) {
            return [];
        }
        var result = [];
        var pos = null;
        var i = -1;
        while (pos !== -1) {
            pos = text.indexOf(substringToFind, i + 1);
            if (pos !== -1) {
                result.push(pos);
            }
            i = pos;
        }
        return result;
    };
    StringTools.returnSpacesLocations = function (text) {
        var spaceTester = new RegExp(/^\s$/);
        var result = [];
        for (var i = 0; i < text.length; i++) {
            if (spaceTester.test(text[i])) {
                result.push(i);
            }
        }
        return result;
    };
    StringTools.returnDoubleSpacesLocations = function (text) {
        var result = [];
        text.replace(/\s{2,}/g, function (matchString, locationIndex) {
            result.push(locationIndex);
            return "";
        });
        return result;
    };
    StringTools.returnWordsFirstLetterLocations = function (text) {
        var result = [];
        var words = text.split(/\s+/);
        if (text.length > 0) {
            result.push(0);
        }
        var prevWordPos;
        for (var i = 1; i < words.length; i++) {
            prevWordPos = result[i - 1] + words[i - 1].length;
            result.push((text.indexOf(words[i], prevWordPos)));
        }
        return result;
    };
    StringTools.returnWords = function (text) {
        return text.split(/\s+/);
    };
    StringTools.removeCharacters = function (text, charactersIndexes) {
        for (var _i = 0, charactersIndexes_1 = charactersIndexes; _i < charactersIndexes_1.length; _i++) {
            var index = charactersIndexes_1[_i];
            text = text.substring(0, index) + text.substring(index + 1, text.length);
        }
        return text;
    };
    StringTools.replaceAt = function (text, index, replacement) {
        return text.substr(0, index) + replacement + text.substr(index + replacement.length);
    };
    StringTools.removeAt = function (text, index) {
        return text.substring(0, index) + text.substring(index + 1, text.length);
    };
    StringTools.removeCharactersSince = function (text, characterIndex) {
        var indexesToRemove = StringTools.returnAllCharacterIndexesSince(text, characterIndex);
        return StringTools.removeCharacters(text, indexesToRemove);
    };
    StringTools.insert = function (source, textToInsert, positionToInsert) {
        return source.substr(0, positionToInsert) + textToInsert + source.substr(positionToInsert);
    };
    StringTools.containsAt = function (text, substring, location) {
        if (text.length < location + substring.length) {
            return false;
        }
        for (var i = 0; i < substring.length; i++) {
            if (substring[i] === text[i + location]) {
                continue;
            }
            return false;
        }
        return true;
    };
    return StringTools;
}());
exports.StringTools = StringTools;
