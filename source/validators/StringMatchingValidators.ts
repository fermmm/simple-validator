import { getErrorInLanguage, Validation } from "..";
import { ErrorTexts } from "../strings/ErrorTexts";
import { StringTools } from "../tools/StringTools";

export class StringMatchingValidators {

    public static shouldStartWith(validation: Validation, textToMatch: string, autocorrect: boolean): Validation {
        if (validation.result.text.startsWith(textToMatch)) {
            return validation;
        }

        if (!autocorrect || validation.result.text.length < textToMatch.length) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.START_WITH, textToMatch)),
                locations: [0],
            });
        } else {
            validation.result.text = textToMatch + validation.result.text;
        }

        return validation;
    }

    public static shouldEndWith(validation: Validation, textToMatch: string): Validation {
        if (validation.result.text.endsWith(textToMatch)) {
            return validation;
        }

        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.END_WITH, textToMatch)),
            locations: [validation.result.text.length - 1],
        });

        return validation;
    }

}
