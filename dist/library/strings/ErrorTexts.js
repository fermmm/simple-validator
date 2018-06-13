"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorTexts = /** @class */ (function () {
    function ErrorTexts() {
    }
    ErrorTexts.MIN_CHARS = {
        en: "must contain a minimum of ~ characters.",
        es: "debe tener un mínimo de ~ caracteres.",
    };
    ErrorTexts.MAX_CHARS = {
        en: "must contain a maximum of ~ characters.",
        es: "debe tener un máximo de ~ caracteres.",
    };
    ErrorTexts.MIN_WORDS = {
        en: "must contain a minimum of ~ words.",
        es: "debe tener un mínimo de ~ palabras.",
    };
    ErrorTexts.MAX_WORDS = {
        en: "must contain a maximum of ~ words.",
        es: "debe tener un máximo de ~ palabras.",
    };
    ErrorTexts.NO_LETTERS = {
        en: "letters are not allowed.",
        es: "no se permite escribir letras.",
    };
    ErrorTexts.NO_NUMBERS = {
        en: "numbers are not allowed.",
        es: "no se permite escribir números.",
    };
    ErrorTexts.NO_SPACES = {
        en: "spaces are not allowed.",
        es: "no se permite escribir espacios.",
    };
    ErrorTexts.NO_INVALID_SPACES = {
        en: "spaces at the beginning and double spaces are not allowed.",
        es: "no se permite escribir espacios al inicio ni espacios dobles.",
    };
    ErrorTexts.NO_SPECIAL_CHARS = {
        en: "special characters are not allowed.",
        es: "no se permite escribir caracteres especiales.",
    };
    ErrorTexts.NO_SPECIAL_CHARS_EXCEPTION = {
        en: "special characters are not allowed, except for: ~",
        es: "no se permite escribir caracteres especiales, con excepción de: ~",
    };
    ErrorTexts.START_WITH = {
        en: "must start with ~.",
        es: "debe comenzar con ~.",
    };
    ErrorTexts.END_WITH = {
        en: "must end with ~.",
        es: "debe finalizar con ~.",
    };
    ErrorTexts.SHOULD_CONTAIN_SINGLE = {
        en: "must contain ~ character.",
        es: "debe contener el caracter ~",
    };
    ErrorTexts.SHOULD_CONTAIN_MULTIPLE = {
        en: "must contain the following: ~",
        es: "debe contener lo siguiente: ~",
    };
    ErrorTexts.SHOULD_CONTAIN_AFTER = {
        en: "must contain ~ after & with a distance of at least # characters.",
        es: "debe contener ~ después de & con una distancia mínima de # caracteres.",
    };
    ErrorTexts.SHOULD_CONTAIN_BEFORE = {
        en: "must contain ~ before & with a distance of at least # characters.",
        es: "debe contener ~ antes de & con una distancia mínima de # caracteres.",
    };
    ErrorTexts.SHOULD_CONTAIN_AT_FROM_BEGGINING = {
        en: "in the ~º character should be the following: &",
        es: "en el ~º caracter debería estar lo siguiente: &",
    };
    ErrorTexts.SHOULD_CONTAIN_AT_FROM_BOTTOM = {
        en: "in the ~º character counting from the end should be the following: &",
        es: "en el ~º caracter contando desde el final debería estar lo siguiente: &",
    };
    ErrorTexts.CONFIRM_PASSWORD = {
        en: "password confirmation does not match.",
        es: "la confirmación de la contraseña no coincide.",
    };
    ErrorTexts.CONFIRM_EMAIL = {
        en: "e-mail confirmation does not match.",
        es: "la confirmación del e-mail no coincide.",
    };
    ErrorTexts.CUSTOM_REGEX = {
        en: "is invalid.",
        es: "no es valido.",
    };
    ErrorTexts.FIRST_LETTER_UPPERCASE = {
        en: "the first character should be upper case.",
        es: "el primer caracter debe estar en mayuscula.",
    };
    ErrorTexts.NO_EMPTY = {
        en: "can't be empty.",
        es: "no puede estar vacio.",
    };
    return ErrorTexts;
}());
exports.ErrorTexts = ErrorTexts;
