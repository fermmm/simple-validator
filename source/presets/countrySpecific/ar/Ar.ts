import { getErrorInLanguage, IValidationErrorText, Validation } from "../../../index";

export class Ar {

    private static getCuitOrCuilLastCharacter(first2Digits: string, dni: string): number {
        // This algorithm was built using this information: https://www.taringa.net/posts/info/2516766/Como-obtener-tu-numero-de-CUIT-CUIL-con-un-truco-matematico.html
        const digitMultipliers: number[] = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        const multiplicationResults: number[] = [];

        multiplicationResults.push(parseFloat(first2Digits[0]) * digitMultipliers[0]);
        multiplicationResults.push(parseFloat(first2Digits[1]) * digitMultipliers[1]);

        for (let i: number = 0; i < dni.length; i++) {
            multiplicationResults.push(parseFloat(dni[i]) * digitMultipliers[i + 2]);
        }

        let sum: number = 0;
        for (const value of multiplicationResults) {
            sum += value;
        }

        const result: number = sum % 11;

        if (result === 0) {
            return 0;
        }

        if (result === 1) {
            return 9;
        }

        return 11 - result;
    }

    constructor(private validation: Validation) {}

    /**
     * CUIT/CUIL is composed of [XX]-[DNI]-[SECURITY CODE]
     * DNI can have 7 or 8 characters, so the dash can't be autocorrected.
     * XX should be a 2 digit number usually asociated with a gender code or company code.
     * SECURITY CODE is calculated by an algorithm using the XX and DNI, this can be validated.
     *
     * @param autocorrect Autocorrect is partialy supported.
     * @param validateLastCharacter Last character can be validated using an algorithm.
     */
    public cuitOrCuil(autocorrect: boolean = true, validateLastCharacter: boolean = true): Validation {
        this.validation
            .noLettersAllowed(autocorrect)
            .noSpacesAllowed(autocorrect)
            .noSpecialCharactersAllowed(false, [], autocorrect)
            .minChars(10)
            .maxChars(11);

        if (this.validation.result.isValid === false) {
            const desc: IValidationErrorText = this.validation.result.errors[0].description;

            if (desc.en) {
                desc.en += "  Example: 20333582657";
            }
            if (desc.es) {
                desc.es += "  Ejemplo: 20333582657";
            }
            return this.validation;
        }

        if (!validateLastCharacter) {
            return this.validation;
        }

        const text: string          = this.validation.result.text;
        const length: number        = text.length;
        const first2Digits: string  = text.substring(0, 2);
        const dni: string           = text.substring(2, length - 1);
        const lastCharacter: number = parseFloat(text[length - 1]);

        if (Ar.getCuitOrCuilLastCharacter(first2Digits, dni) !== lastCharacter) {
            this.validation.result.isValid = false;
            this.validation.result.errors.push({
                description: getErrorInLanguage({es: "no es un CUIT/CUIL válido.", en: "is not a valid CUIT/CUIL."}),
                locations: [],
            });
        }

        return this.validation;
    }

   /**
    * Ar patents has 2 formats:
    *
    * Format A: AAA123
    * Format B: AA123BB
    *
    * @param autocorrect Autocorrect is partially supported.
    */
    public patent(autocorrect: boolean = true): Validation {
        this.validation
            .minChars(6)
            .maxChars(7, false)
            .noSpecialCharactersAllowed(false, [], autocorrect)
            .noSpacesAllowed(autocorrect);

        if (autocorrect) {
            this.validation.result.text = this.validation.result.text.toUpperCase();
        }

        if (this.validation.result.isValid === false) {
            return this.validation;
        }

        const isFormatA: boolean = new Validation(this.validation.result.text.substring(0, 3)).noNumbersAllowed(false).result.isValid;

        if (isFormatA) {
            this.validation.maxChars(6, false);
            const secondPartIsValid: boolean = new Validation(this.validation.result.text.substring(3, 6)).noLettersAllowed(false).minChars(3).result.isValid;
            if (!secondPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: getErrorInLanguage({es: "los 3 últimos dígitos deben ser números.", en: "the last 3 digits must be numbers."}),
                    locations: [3,4,5],
                });
            }
        } else {
            const firstPartIsValid: boolean = new Validation(this.validation.result.text.substring(0, 2)).noNumbersAllowed(false).minChars(2).result.isValid;
            if (!firstPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: getErrorInLanguage({es: "los 2 primeros dígitos deben ser letras.", en: "the first 2 digits must be letters."}),
                    locations: [0, 1],
                });
            }

            const secondPartIsValid: boolean = new Validation(this.validation.result.text.substring(2, 5)).noLettersAllowed(false).minChars(3).result.isValid;
            if (!secondPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: getErrorInLanguage({es: "del tercero al quinto digito deben ser números.", en: "from the third to the fifth character must be numbers."}),
                    locations: [2, 3, 4],
                });
            }

            const thirdPartIsValid: boolean = new Validation(this.validation.result.text.substring(5, 7)).noNumbersAllowed(false).minChars(2).result.isValid;
            if (!thirdPartIsValid) {
                this.validation.result.isValid = false;
                this.validation.result.errors.push({
                    description: getErrorInLanguage({es: "los últimos 2 dígitos deben ser letras.", en: "the last 2 characters must be letters."}),
                    locations: [5, 6],
                });
            }
        }
        return this.validation;
    }

    public phone(autocorrect: boolean = true): Validation {
        return this.validation
            .noLettersAllowed(autocorrect)
            .minChars(10)
            .maxChars(10)
            .noSpacesAllowed(autocorrect)
            .noSpecialCharactersAllowed(false, [], autocorrect);
    }
}
