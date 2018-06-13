import { Validation } from "..";
export declare class CharacterTypeValidators {
    static noLettersAllowed(validation: Validation, autocorrect: boolean): Validation;
    static noNumbersAllowed(validation: Validation, autocorrect: boolean): Validation;
    static noSpacesAllowed(validation: Validation, autocorrect: boolean): Validation;
    static specialCharacters(validation: Validation, allowUnicode?: boolean, exceptions?: string[], autocorrect?: boolean): Validation;
    static invalidSpaces(validation: Validation, autoCorrect: boolean): Validation;
    static wordsShouldStartWithUpperCase(validation: Validation, autocorrect: boolean): Validation;
}
