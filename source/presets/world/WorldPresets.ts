import { Validation } from "../../index";

export class WorldPresets {

    constructor(
        private validation: Validation,
    ) {
    }

    /**
     * Email validator preset. Does not report error details, only if it's valid or not.
     *
     * @param autocorrect Deprecated parameter. This method does not support autocorrect.
     */
    public email(autocorrect: boolean = true): Validation {
        // tslint:disable-next-line:max-line-length
        return this.validation.customRegex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    /**
     * @deprecated Deprecated. Use email() instead.
     */
    public emailStrict(): Validation {
        // tslint:disable-next-line:max-line-length
        return this.email();
    }

    public nameOrLastName(autoCorrect: boolean = true): Validation {
        return this.validation
            .noNumbersAllowed(autoCorrect)
            .noInvalidSpacesAllowed(autoCorrect)
            .noSpacesAllowed(autoCorrect)
            .noSpecialCharactersAllowed(true, null, autoCorrect)
            .maxChars(100, autoCorrect)
            .minWords(1)
            .maxWords(1, autoCorrect)
            .wordsShouldStartWithUpperCase(autoCorrect);
    }

    public nameComplete(autoCorrect: boolean = true, minWords: number = 2, maxWords: number = 5): Validation {
        return this.validation
            .noNumbersAllowed(autoCorrect)
            .noInvalidSpacesAllowed(autoCorrect)
            .noSpecialCharactersAllowed(true, null, autoCorrect)
            .maxChars(230, autoCorrect)
            .minWords(minWords)
            .maxWords(maxWords, autoCorrect)
            .wordsShouldStartWithUpperCase(autoCorrect);
    }
}
