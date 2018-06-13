import { Validation } from "../../../index";
export declare class Ar {
    private validation;
    private static getCuitOrCuilLastCharacter;
    constructor(validation: Validation);
    /**
     * CUIT/CUIL is composed of [XX]-[DNI]-[SECURITY CODE]
     * DNI can have 7 or 8 characters, so the dash can't be autocorrected.
     * XX should be a 2 digit number usually asociated with a gender code or company code.
     * SECURITY CODE is calculated by an algorithm using the XX and DNI, this can be validated.
     *
     * @param autocorrect Autocorrect is partialy supported.
     * @param validateLastCharacter Last character can be validated using an algorithm.
     */
    cuitOrCuil(autocorrect?: boolean, validateLastCharacter?: boolean): Validation;
    /**
     * Ar patents has 2 formats:
     *
     * Format A: AAA123
     * Format B: AA123BB
     *
     * @param autocorrect Autocorrect is partially supported.
     */
    patent(autocorrect?: boolean): Validation;
    phone(autocorrect?: boolean): Validation;
}
