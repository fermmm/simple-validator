import { IValidationErrorText } from "..";

export class ErrorTexts {

  public static MIN_CHARS: IValidationErrorText = {
    en: "must contain a minimum of ~ characters.",
    es: "debe tener un mínimo de ~ caracteres.",
  };

  public static MAX_CHARS: IValidationErrorText = {
    en: "must contain a maximum of ~ characters.",
    es: "debe tener un máximo de ~ caracteres.",
  };

  public static MIN_WORDS: IValidationErrorText = {
    en: "must contain a minimum of ~ words.",
    es: "debe tener un mínimo de ~ palabras.",
  };

  public static MAX_WORDS: IValidationErrorText = {
    en: "must contain a maximum of ~ words.",
    es: "debe tener un máximo de ~ palabras.",
  };

  public static NO_LETTERS: IValidationErrorText = {
    en: "letters are not allowed.",
    es: "no se permite escribir letras.",
  };

  public static NO_NUMBERS: IValidationErrorText = {
    en: "numbers are not allowed.",
    es: "no se permite escribir números.",
  };

  public static NO_SPACES: IValidationErrorText = {
    en: "spaces are not allowed.",
    es: "no se permite escribir espacios.",
  };

  public static NO_INVALID_SPACES: IValidationErrorText = {
    en: "spaces at the beginning and double spaces are not allowed.",
    es: "no se permite escribir espacios al inicio ni espacios dobles.",
  };

  public static NO_SPECIAL_CHARS: IValidationErrorText = {
    en: "special characters are not allowed.",
    es: "no se permite escribir caracteres especiales.",
  };

  public static NO_SPECIAL_CHARS_EXCEPTION: IValidationErrorText = {
    en: "special characters are not allowed, except for: ~",
    es: "no se permite escribir caracteres especiales, con excepción de: ~",
  };

  public static START_WITH: IValidationErrorText = {
    en: "must start with ~.",
    es: "debe comenzar con ~.",
  };

  public static END_WITH: IValidationErrorText = {
    en: "must end with ~.",
    es: "debe finalizar con ~.",
  };

  public static SHOULD_CONTAIN_SINGLE: IValidationErrorText = {
    en: "must contain ~ character.",
    es: "debe contener el caracter ~",
  };

  public static SHOULD_CONTAIN_MULTIPLE: IValidationErrorText = {
    en: "must contain the following: ~",
    es: "debe contener lo siguiente: ~",
  };

  public static SHOULD_CONTAIN_AFTER: IValidationErrorText = {
    en: "must contain ~ after & with a distance of at least # characters.",
    es: "debe contener ~ después de & con una distancia mínima de # caracteres.",
  };

  public static SHOULD_CONTAIN_BEFORE: IValidationErrorText = {
    en: "must contain ~ before & with a distance of at least # characters.",
    es: "debe contener ~ antes de & con una distancia mínima de # caracteres.",
  };

  public static SHOULD_CONTAIN_AT_FROM_BEGGINING: IValidationErrorText = {
    en: "in the ~º character should be the following: &",
    es: "en el ~º caracter debería estar lo siguiente: &",
  };

  public static SHOULD_CONTAIN_AT_FROM_BOTTOM: IValidationErrorText = {
    en: "in the ~º character counting from the end should be the following: &",
    es: "en el ~º caracter contando desde el final debería estar lo siguiente: &",
  };

  public static CONFIRM_PASSWORD: IValidationErrorText = {
    en: "password confirmation does not match.",
    es: "la confirmación de la contraseña no coincide.",
  };

  public static CONFIRM_EMAIL: IValidationErrorText = {
    en: "e-mail confirmation does not match.",
    es: "la confirmación del e-mail no coincide.",
  };

  public static CUSTOM_REGEX: IValidationErrorText = {
    en: "is invalid.",
    es: "no es valido.",
  };

  public static FIRST_LETTER_UPPERCASE: IValidationErrorText = {
    en: "the first character should be upper case.",
    es: "el primer caracter debe estar en mayuscula.",
  };

  public static NO_EMPTY: IValidationErrorText = {
    en: "can't be empty.",
    es: "no puede estar vacio.",
  };
}
