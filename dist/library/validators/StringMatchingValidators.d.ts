import { Validation } from "..";
export declare class StringMatchingValidators {
    static shouldStartWith(validation: Validation, textToMatch: string, autocorrect: boolean): Validation;
    static shouldEndWith(validation: Validation, textToMatch: string): Validation;
}
