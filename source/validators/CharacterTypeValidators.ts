import { getErrorInLanguage, IValidationErrorData, IValidationErrorText, Validation } from "..";
import { ErrorTexts } from "../strings/ErrorTexts";
import { StringTools } from "../tools/StringTools";

export class CharacterTypeValidators {

    public static noLettersAllowed(validation: Validation, autocorrect: boolean): Validation {
        const matchingIndexes: number[] = StringTools.returnMatchingIndexes(validation.result.text, /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/);

        if (matchingIndexes.length === 0) {
            return validation;
        }

        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.NO_LETTERS),
                locations: matchingIndexes,
            });
        } else {
            validation.result.text = StringTools.removeCharacters(validation.result.text, matchingIndexes);
        }

        return validation;
    }

    public static noNumbersAllowed(validation: Validation, autocorrect: boolean): Validation {
        const matchingIndexes: number[] = StringTools.returnMatchingIndexes(validation.result.text, new RegExp("^[0-9]+$"));

        if (matchingIndexes.length === 0) {
            return validation;
        }

        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.NO_NUMBERS),
                locations: matchingIndexes,
            });
        } else {
            validation.result.text = StringTools.removeCharacters(validation.result.text, matchingIndexes);
        }

        return validation;
    }

    public static noSpacesAllowed(validation: Validation, autocorrect: boolean): Validation {
        const spacesLocations: number[] = StringTools.returnSpacesLocations(validation.result.text);

        if (spacesLocations.length === 0) {
            return validation;
        }
        if (!autocorrect) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.NO_SPACES),
                locations: spacesLocations,
            });
        } else {
            validation.result.text = StringTools.removeCharacters(validation.result.text, spacesLocations);
        }

        return validation;
    }

    public static specialCharacters(validation: Validation, allowUnicode: boolean = true, exceptions: string[] = null, autocorrect: boolean = true): Validation {
        const regExp: RegExp = allowUnicode ? new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]+$/) : new RegExp(/[a-zA-Z0-9 ]+$/);
        const notMatchingIndexes: number[] = StringTools.returnNotMatchingIndexes(validation.result.text, regExp, exceptions);

        if (notMatchingIndexes.length === 0) {
            return validation;
        }

        if (!autocorrect) {
            let errorText: IValidationErrorText;

            if (exceptions != null && exceptions.length > 0) {
                let exceptionChars: string = "";
                for (const exceptionChar of exceptions) {
                    exceptionChars += exceptionChar + " ";
                }
                errorText = StringTools.specialCharReplace(ErrorTexts.NO_SPECIAL_CHARS_EXCEPTION, exceptionChars);
            } else {
                errorText = ErrorTexts.NO_SPECIAL_CHARS;
            }

            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(errorText),
                locations: notMatchingIndexes,
            });
        } else {
            validation.result.text = StringTools.removeCharacters(validation.result.text, notMatchingIndexes);
        }

        return validation;
    }

    public static invalidSpaces(validation: Validation, autoCorrect: boolean): Validation {
        const doubleSpacesLocations: number[] = StringTools.returnDoubleSpacesLocations(validation.result.text);

        let spaceAtTheBeginning: boolean = false;

        if (/\s+/.test(validation.result.text[0])) {
            spaceAtTheBeginning = true;
        }

        if (doubleSpacesLocations.length === 0 && spaceAtTheBeginning === false) {
            return validation;
        }

        if (autoCorrect) {
            let doubleSpacesLocationsUpdated: number[] = doubleSpacesLocations;
            for (const l of doubleSpacesLocations) {
                doubleSpacesLocationsUpdated = StringTools.returnDoubleSpacesLocations(validation.result.text);
                if (doubleSpacesLocationsUpdated.length > 0) {
                    validation.result.text = StringTools.removeAt(validation.result.text, doubleSpacesLocations[0]);
                }
            }

            if (/\s+/.test(validation.result.text[0])) {
                validation.result.text = StringTools.removeAt(validation.result.text, 0);
            }
            return validation;
        }

        let errorLocations: number[] = [];
        if (doubleSpacesLocations.length > 0) {
            errorLocations = doubleSpacesLocations;
        }
        if (spaceAtTheBeginning) {
            errorLocations.push(0);
        }

        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(ErrorTexts.NO_INVALID_SPACES),
            locations: errorLocations,
        });

        return validation;
    }

    public static wordsShouldStartWithUpperCase(validation: Validation, autocorrect: boolean): Validation {
        const wordsLocations: number[] = StringTools.returnWordsFirstLetterLocations(validation.result.text);
        const problemsLocations: number[] = [];
        for (const wordLocation of wordsLocations) {
            if (validation.result.text[wordLocation] === validation.result.text[wordLocation].toUpperCase()) {
                continue;
            }

            problemsLocations.push(wordLocation);

            if (autocorrect) {
                validation.result.text = StringTools.replaceAt(validation.result.text, wordLocation, validation.result.text[wordLocation].toUpperCase());
            }
        }

        if (!autocorrect && problemsLocations.length > 0) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.FIRST_LETTER_UPPERCASE),
                locations: problemsLocations,
            });
        }

        return validation;
    }
}
