import { Validation } from "../../index";
export declare class WorldPresets {
    private validation;
    constructor(validation: Validation);
    /**
     * Email validator preset. Does not report error details, only if it's valid or not.
     *
     * @param autocorrect Deprecated parameter. This method does not support autocorrect.
     */
    email(autocorrect?: boolean): Validation;
    /**
     * @deprecated Deprecated. Use email() instead.
     */
    emailStrict(): Validation;
    nameOrLastName(autoCorrect?: boolean): Validation;
    nameComplete(autoCorrect?: boolean, minWords?: number, maxWords?: number): Validation;
}
