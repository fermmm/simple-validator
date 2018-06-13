"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../index");
var Ar = /** @class */ (function () {
    function Ar(validation) {
        this.validation = validation;
    }
    Ar.getCuitOrCuilLastCharacter = function (first2Digits, dni) {
        // This algorithm was built using this information: https://www.taringa.net/posts/info/2516766/Como-obtener-tu-numero-de-CUIT-CUIL-con-un-truco-matematico.html
        var digitMultipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var multiplicationResults = [];
        multiplicationResults.push(parseFloat(first2Digits[0]) * digitMultipliers[0]);
        multiplicationResults.push(parseFloat(first2Digits[1]) * digitMultipliers[1]);
        for (var i = 0; i < dni.length; i++) {
            multiplicationResults.push(parseFloat(dni[i]) * digitMultipliers[i + 2]);
        }
        var sum = 0;
        for (var _i = 0, multiplicationResults_1 = multiplicationResults; _i < multiplicationResults_1.length; _i++) {
            var value = multiplicationResults_1[_i];
            sum += value;
        }
        var result = sum % 11;
        if (result === 0) {
            return 0;
        }
        if (result === 1) {
            return 9;
        }
        return 11 - result;
    };
    /**
     * CUIT/CUIL is composed of [XX]-[DNI]-[SECURITY CODE]
     * DNI can have 7 or 8 characters, so the dash can't be autocorrected.
     * XX should be a 2 digit number usually asociated with a gender code or company code.
     * SECURITY CODE is calculated by an algorithm using the XX and DNI, this can be validated.
     *
     * @param autocorrect Autocorrect is partialy supported.
     * @param validateLastCharacter Last character can be validated using an algorithm.
     */
    Ar.prototype.cuitOrCuil = function (autocorrect, validateLastCharacter) {
        if (autocorrect === void 0) { autocorrect = true; }
        if (validateLastCharacter === void 0) { validateLastCharacter = true; }
        this.validation
            .noLettersAllowed(autocorrect)
            .noSpacesAllowed(autocorrect)
            .noSpecialCharactersAllowed(false, [], autocorrect)
            .minChars(10)
            .maxChars(11);
        if (this.validation.result.isValid === false) {
            var desc = this.validation.result.errors[0].description;
            if (desc.en) {
                desc.en += "  Example: 20333582657";
            }
            if (desc.es) {
                desc.es += "  Ejemplo: 20333582657";
            }
            return this.validation;
        }
        if (!validateLastCharacter) {
            return this.validation;
        }
        var text = this.validation.result.text;
        var length = text.length;
        var first2Digits = text.substring(0, 2);
        var dni = text.substring(2, length - 1);
        var lastCharacter = parseFloat(text[length - 1]);
        if (Ar.getCuitOrCuilLastCharacter(first2Digits, dni) !== lastCharacter) {
            this.validation.result.isValid = false;
            this.validation.result.errors.push({
                description: index_1.getErrorInLanguage({ es: "no es un CUIT/CUIL válido.", en: "is not a valid CUIT/CUIL." }),
                locations: [],
            });
        }
        return this.validation;
    };
    /**
     * Ar patents has 2 formats:
     *
     * Format A: AAA123
     * Format B: AA123BB
     *
     * @param autocorrect Autocorrect is partially supported.
     */
    Ar.prototype.patent = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        this.validation
            .minChars(6)
            .maxChars(7, false)
            .noSpecialCharactersAllowed(false, [], autocorrect)
            .noSpacesAllowed(autocorrect);
        if (autocorrect) {
            this.validation.result.text = this.validation.result.text.toUpperCase();
        }
        if (this.validation.result.isValid === false) {
            return this.validation;
        }
        var isFormatA = new index_1.Validation(this.validation.result.text.substring(0, 3)).noNumbersAllowed(false).result.isValid;
        if (isFormatA) {
            this.validation.maxChars(6, false);
            var secondPartIsValid = new index_1.Validation(this.validation.result.text.substring(3, 6)).noLettersAllowed(false).minChars(3).result.isValid;
            if (!secondPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: index_1.getErrorInLanguage({ es: "los 3 últimos dígitos deben ser números.", en: "the last 3 digits must be numbers." }),
                    locations: [3, 4, 5],
                });
            }
        }
        else {
            var firstPartIsValid = new index_1.Validation(this.validation.result.text.substring(0, 2)).noNumbersAllowed(false).minChars(2).result.isValid;
            if (!firstPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: index_1.getErrorInLanguage({ es: "los 2 primeros dígitos deben ser letras.", en: "the first 2 digits must be letters." }),
                    locations: [0, 1],
                });
            }
            var secondPartIsValid = new index_1.Validation(this.validation.result.text.substring(2, 5)).noLettersAllowed(false).minChars(3).result.isValid;
            if (!secondPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: index_1.getErrorInLanguage({ es: "del tercero al quinto digito deben ser números.", en: "from the third to the fifth character must be numbers." }),
                    locations: [2, 3, 4],
                });
            }
            var thirdPartIsValid = new index_1.Validation(this.validation.result.text.substring(5, 7)).noNumbersAllowed(false).minChars(2).result.isValid;
            if (!thirdPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: index_1.getErrorInLanguage({ es: "los últimos 2 dígitos deben ser letras.", en: "the last 2 characters must be letters." }),
                    locations: [5, 6],
                });
            }
        }
        return this.validation;
    };
    Ar.prototype.phone = function (autocorrect) {
        if (autocorrect === void 0) { autocorrect = true; }
        return this.validation
            .noLettersAllowed(autocorrect)
            .minChars(10)
            .maxChars(10)
            .noSpacesAllowed(autocorrect)
            .noSpecialCharactersAllowed(false, [], autocorrect);
    };
    return Ar;
}());
exports.Ar = Ar;
