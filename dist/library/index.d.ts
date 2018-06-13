/**
 * Filter to set the language of the text returned and avoid big objects containing text for all languages.
 */
export declare enum LanguageFilter {
    all = "all",
    english = "en",
    spanish = "es"
}
export declare class Validation {
    /**
     * Filter to set the language of the text returned and avoid big objects containing text for all languages. Default: "all".
     */
    static languageFilter: LanguageFilter;
    /**
     * The results of the validation are stored in this property.
     */
    result: IValidationResults;
    /**
     * After calling the constructor you can start chaining methods to validate.
     * @param text The text to validate, usually an input field text.
     * @param canBeEmpty Report error when the field is empty. Default: false.
     */
    constructor(text: string, canBeEmpty?: boolean);
    /**
     * A minimum of characters that should be written.
     * @param charsAmount The amount of minimum characters allowed.
     */
    minChars(charsAmount: number): Validation;
    /**
     * Maximum of characters that should be written.
     * @param autocorrect In this case autocorrect default value is false because when the user writes more than
     * what is needed he/she needs to be aware of what is happening otherwise it looks like the input field is bugged.
     */
    maxChars(charsAmount: number, autocorrect?: boolean): Validation;
    /**
     * Minmum amount of words that should be written.
     */
    minWords(wordsAmount: number): Validation;
    /**
     * Max amount of words that should be written.
     */
    maxWords(wordsAmount: number, autocorrect?: boolean): Validation;
    noNumbersAllowed(autocorrect?: boolean): Validation;
    noLettersAllowed(autocorrect?: boolean): Validation;
    noSpacesAllowed(autocorrect?: boolean): Validation;
    /**
     * Invalid spaces means when the first character is a space or when there is one space after the other.
     * @param autocorrect Autocorrect removing concatenated spaces and first space or the problem should be returned as an error.
     */
    noInvalidSpacesAllowed(autocorrect?: boolean): Validation;
    /**
     * This validator only allows alphanumeric characters by dafault (only letters and numbers), you can specify exceptions.
     * @param allowUnicode If you have a string like "Âlvarö", it would reject it because of the letters Â and ö unless this is true (default).
     * @param exceptions A list of characters that are allowed.
     */
    noSpecialCharactersAllowed(allowUnicode?: boolean, exceptions?: string[], autocorrect?: boolean): Validation;
    shouldStartWith(textToMatch: string, autocorrect?: boolean): Validation;
    shouldEndWith(textToMatch: string): Validation;
    shouldContain(characterOrText: string, maxAllowed?: number): Validation;
    /**
     * This validator only evaluates the first character of each word: If it's a letter in upper case is valid, if
     * it's not a letter is valid, if it's a letter in lowercase is invalid.
     */
    wordsShouldStartWithUpperCase(autocorrect?: boolean): Validation;
    /**
     * When a character or text inside string should be present after another one.
     * @param characterOrText The character or text that should be present after another one.
     * @param referenceCharacterOrText The character or text that should be before.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    shouldContainAfter(characterOrText: string, referenceCharacterOrText: string, minDistance?: number): Validation;
    /**
     * When a character or text inside string should be present before another one.
     * @param characterOrText The character or text that should be present before another one.
     * @param referenceCharacterOrText The character or text that should be after.
     * @param minDistance The minimum index dinstance from one to the other. Shoud be a value higher than 1.
     */
    shouldContainBefore(characterOrText: string, referenceCharacterOrText: string, minDistance?: number): Validation;
    /**
     * When a text or character should be in a specific position.
     * @param textOrCharacter The text or character that should be in a specific position.
     * @param positionIndex The position index in the string in where the text or character should be at.
     * @param fromTheBeginning If the position index should be counted from the beggining or from the bottom of the string. Warning: Autocorrect does not work if this is false.
     * @param autocorrect Autocorrect adding the text or character or if it should be returned as an error. If fromTheBeginning is false this does not work.
     */
    shouldContainAt(textOrCharacter: string, positionIndex: number, fromTheBeginning?: boolean, autocorrect?: boolean): Validation;
    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "password not matching" error.
     * @param password It can be a string with the password to check for matching, also can be a function that returns a string.
     */
    passwordConfirmation(password: string | (() => string)): Validation;
    /**
     * Checks if the text is the same than the text passed to this function, if the texts does not match creates a "email not matching" error.
     * @param email It can be a string with the email to check for matching, also can be a function that returns a string.
     */
    emailConfirmation(email: string | (() => string)): Validation;
    /**
     * With this filter you apply a custom regex. Useful in complex validations. The drawback is that this does not return useful
     * information in the error text and does not support auto correct.
     *
     * @param regex Regex expression.
     * @param invert To switch, so the regex allows or dissallows the validation.
     */
    customRegex(regex: RegExp, invert?: boolean): Validation;
    /**
     * Email validator rule. Does not report error details, only if it's valid or not.
     */
    isEmail(): Validation;
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
export declare function getErrorInLanguage(allLanguagesError: IValidationErrorText): IValidationErrorText;
