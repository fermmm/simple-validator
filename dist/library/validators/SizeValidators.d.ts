import { Validation } from "..";
export declare class SizeValidators {
    static minChars(validation: Validation, charsAmount: number): Validation;
    static maxChars(validation: Validation, charsAmount: number, autocorect: boolean): Validation;
    static minWords(validation: Validation, minimum: number): Validation;
    static maxWords(validation: Validation, maximum: number, autocorrect?: boolean): Validation;
}
