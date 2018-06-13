import { Presets } from "./presets/Presets";
import { ErrorTexts } from "./strings/ErrorTexts";
import { CharacterTypeValidators } from "./validators/CharacterTypeValidators";
import { ContentValidators } from "./validators/ContentValidators";
import { SizeValidators } from "./validators/SizeValidators";
import { StringMatchingValidators } from "./validators/StringMatchingValidators";

/**
 * Filter to set the language of the text returned and avoid big objects containing text for all languages.
 */
export enum LanguageFilter {
    all = "all",
    english = "en",
    spanish = "es",
}

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
export class Validation {
    /**
     * Filter to set the language of the text returned and avoid big objects containing text for all languages. Default: "all".
     */
    public static languageFilter: LanguageFilter = LanguageFilter.all;

    /**
     * The results of the validation are stored in this property.
     */
    public result: IValidationResults;

    /**
     * Use this to make validations using already made querys for common things like e-mail validation.
     */
    public presets: Presets;


    /**
     * After calling the constructor you can start chaining methods to validate.
     * @param text The text to validate, usually an input field text.
     * @param canBeEmpty Report error when the field is empty. Default: false.
     */
    constructor(text: string, canBeEmpty: boolean = false) {
        this.result = {
            errors: [],
            isValid: true,
            text: text,
            textOriginal: text,
        };

        this.presets = new Presets(this);

        if (!canBeEmpty && (text == null || !text.replace(/\s/g, "").length || text === "")) {
            this.result.isValid = false;
            this.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.NO_EMPTY),
                locations: [],
            });
        }
    }

    /**
     * A minimum of characters that should be written.
     * @param charsAmount The amount of minimum characters allowed.
     */
    public minChars(charsAmount: number): Validation {
        return SizeValidators.minChars(this, charsAmount);
    }

    /**
     * Maximum of characters that should be written.
     * @param autocorrect In this case autocorrect default value is false because when the user writes more than
     * what is needed he/she needs to be aware of what is happening otherwise it looks like the input field is bugged.
     */
    public maxChars(charsAmount: number, autocorrect: boolean = false): Validation {
        return SizeValidators.maxChars(this, charsAmount, autocorrect);
    }

    /**
     * Minmum amount of words that should be written.
     */
    public minWords(wordsAmount: number): Validation {
        return SizeValidators.minWords(this, wordsAmount);
    }

    /**
     * Max amount of words that should be written.
     */
    public maxWords(wordsAmount: number, autocorrect: boolean = true): Validation {
        return SizeValidators.maxWords(this, wordsAmount, autocorrect);
    }

    public noNumbersAllowed(autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.noNumbersAllowed(this, autocorrect);
    }

    public noLettersAllowed(autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.noLettersAllowed(this, autocorrect);
    }

    public noSpacesAllowed(autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.noSpacesAllowed(this, autocorrect);
    }

    /**
     * Invalid spaces means when the first character is a space or when there is one space after the other.
     * @param autocorrect Autocorrect removing concatenated spaces and first space or the problem should be returned as an error.
     */
    public noInvalidSpacesAllowed(autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.invalidSpaces(this, autocorrect);
    }

    /**
     * This validator only allows alphanumeric characters by dafault (only letters and numbers), you can specify exceptions.
     * @param allowUnicode If you have a string like "Âlvarö", it would reject it because of the letters Â and ö unless this is true (default).
     * @param exceptions A list of characters that are allowed.
     */
    public noSpecialCharactersAllowed(allowUnicode: boolean = true, exceptions: string[] = null, autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.specialCharacters(this, allowUnicode, exceptions, autocorrect);
    }

    public shouldStartWith(textToMatch: string, autocorrect: boolean = true): Validation {
        return StringMatchingValidators.shouldStartWith(this, textToMatch, autocorrect);
    }

    public shouldEndWith(textToMatch: string): Validation {
        return StringMatchingValidators.shouldEndWith(this, textToMatch);
    }

    public shouldContain(characterOrText: string, maxAllowed: number = null): Validation {
        return ContentValidators.shouldContain(this, characterOrText, maxAllowed);
    }

    /**
     * This validator only evaluates the first character of each word: If it's a letter in upper case is valid, if
     * it's not a letter is valid, if it's a letter in lowercase is invalid.
     */
    public wordsShouldStartWithUpperCase(autocorrect: boolean = true): Validation {
        return CharacterTypeValidators.wordsShouldStartWithUpperCase(this, autocorrect);
    }

    /**
     * When a character or text inside string should be present after another one.
     * @param characterOrText The character or text that should be present after another one.
     * @param referenceCharacterOrText The character or text that should be before.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    public shouldContainAfter(characterOrText: string, referenceCharacterOrText: string, minDistance: number = 1): Validation {
        return ContentValidators.shouldContainAfter(this, characterOrText, referenceCharacterOrText, minDistance);
    }

    /**
     * When a character or text inside string should be present before another one.
     * @param characterOrText The character or text that should be present before another one.
     * @param referenceCharacterOrText The character or text that should be after.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    public shouldContainBefore(characterOrText: string, referenceCharacterOrText: string, minDistance: number = 1): Validation {
        return ContentValidators.shouldContainBefore(this, characterOrText, referenceCharacterOrText, minDistance);
    }

    /**
     * When a text or character should be in a specific position.
     * @param textOrCharacter The text or character that should be in a specific position.
     * @param positionIndex The position index in the string in where the text or character should be at.
     * @param fromTheBeginning If the position index should be counted from the beggining or from the bottom of the string. Warning: Autocorrect does not work if this is false.
     * @param autocorrect Autocorrect adding the text or character or if it should be returned as an error. If fromTheBeginning is false this does not work.
     */
    // tslint:disable-next-line:max-line-length
    public shouldContainAt(textOrCharacter: string, positionIndex: number, fromTheBeginning: boolean = true, autocorrect: boolean = true): Validation {
        return ContentValidators.shouldContainAt(this, textOrCharacter, positionIndex, fromTheBeginning, autocorrect);
    }

    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "password not matching" error.
     * @param password It can be a string with the password to check for matching, also can be a function that returns a string.
     */
    public passwordConfirmation(password: string | (() => string)): Validation {
      return ContentValidators.passwordConfirmation(this, password);
    }

    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "email not matching" error.
     * @param email It can be a string with the email to check for matching, also can be a function that returns a string.
     */
    public emailConfirmation(email: string | (() => string)): Validation {
      return ContentValidators.emailConfirmation(this, email);
    }

    /**
     * With this filter you apply a custom regex. Useful in complex validations. The drawback is that this does not return useful
     * information in the error text and does not support auto correct.
     *
     * @param regex Regex expression.
     * @param invert To switch, so the regex allows or dissallows the validation.
     */
    public customRegex(regex: RegExp, invert: boolean = false): Validation {
        return ContentValidators.customRegex(this, regex, invert);
    }
}

export interface IValidationResults {
    /**
     * Is false when the text can't be corrected by this tool so an error must be showed to the user.
     */
    isValid: boolean;
    /**
     * If the text can be corrected by this tool, this stores the corrected text otherwise stores the original text.
     */
    text: string;
    /**
     * This stores only the original text in case that is needed.
     */
    textOriginal: string;
    /**
     * If there is an error this cointains information including the description and location of the error.
     */
    errors: IValidationErrorData[];
}

export interface IValidationErrorData {
    /**
     * Description of the error to show to the user and help him to correct the input field.
     * Spanish and english languages are supported.
     */
    description: IValidationErrorText;

    /**
     * The string indexes that are related with the error in order to implement a underline in the text of the text field.
     * Warning: This information is not always present.
     */
    locations: number[];
}

/**
 * Multilenguage error description container.
 */
export interface IValidationErrorText {
    en?: string;
    es?: string;
}

export interface IValidationStored {
    validator: (text: string) => Validation;
    validationResult?: IValidationResults;
}

/**
 * Returns the error text in the configured language filter.
 */
export function getErrorInLanguage(allLanguagesError: IValidationErrorText): IValidationErrorText {
    if (Validation.languageFilter === LanguageFilter.all) {
        return allLanguagesError;
    }

    const result: IValidationErrorText = {};
    result[Validation.languageFilter as string] = allLanguagesError[Validation.languageFilter as string];
    return result;
}
