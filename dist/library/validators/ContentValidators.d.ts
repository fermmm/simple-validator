import { Validation } from "..";
export declare class ContentValidators {
    static shouldContain(validation: Validation, substring: string, maxAllowed?: number): Validation;
    static shouldContainAfter(validation: Validation, characterOrText: string, referenceCharacterOrText: string, minDistance?: number): Validation;
    static shouldContainBefore(validation: Validation, characterOrText: string, referenceCharacterOrText: string, minDistance?: number): Validation;
    static shouldContainAt(validation: Validation, textOrCharacter: string, positionIndex: number, fromTheBeginning?: boolean, autocorrect?: boolean): Validation;
    static passwordConfirmation(validation: Validation, password: string | (() => string)): Validation;
    static emailConfirmation(validation: Validation, email: string | (() => string)): Validation;
    static customRegex(validation: Validation, regex: RegExp, invert?: boolean, name?: string): Validation;
}
