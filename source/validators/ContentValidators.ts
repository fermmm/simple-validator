import { getErrorInLanguage, IValidationErrorText, Validation } from "..";
import { ErrorTexts } from "../strings/ErrorTexts";
import { StringTools } from "../tools/StringTools";

export class ContentValidators {

    public static shouldContain(validation: Validation, substring: string, maxAllowed: number = null): Validation {
        if (validation.result.text.includes(substring)) {
            if (maxAllowed != null) {
                if (validation.result.text.split(substring).length - 1 <= maxAllowed) {
                    return validation;
                }
            } else {
                return validation;
            }
        }

        const errorText: IValidationErrorText =
            substring.length === 1 ?
                ErrorTexts.SHOULD_CONTAIN_SINGLE :
                ErrorTexts.SHOULD_CONTAIN_MULTIPLE;

        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(StringTools.specialCharReplace(errorText, substring)),
            locations: [],
        });

        return validation;
    }

    // tslint:disable-next-line:max-line-length
    public static shouldContainAfter(validation: Validation, characterOrText: string, referenceCharacterOrText: string, minDistance: number = 1): Validation {
        let substringLocation: number = -1;
        const allSubstringLocations: number[] = StringTools.returnSubstringMatchingIndexes(validation.result.text, characterOrText);
        if (allSubstringLocations.length > 0) {
            substringLocation = allSubstringLocations[allSubstringLocations.length - 1];
        }
        const referenceSubstringLocation: number = validation.result.text.indexOf(referenceCharacterOrText);
        const distance: number = Math.abs(substringLocation - referenceSubstringLocation);

        if (substringLocation !== -1 &&
            referenceSubstringLocation !== -1 &&
            referenceSubstringLocation < substringLocation &&
            distance >= minDistance
        ) {
            return validation;
        }

        let errorText: IValidationErrorText = StringTools.specialCharReplaceSpecific(ErrorTexts.SHOULD_CONTAIN_AFTER, "~", characterOrText);
        errorText = StringTools.specialCharReplaceSpecific(errorText, "&", referenceCharacterOrText);
        errorText = StringTools.specialCharReplaceSpecific(errorText, "#", minDistance.toString());

        const locationsIndexes: number[] = [];

        if (substringLocation !== -1) {
            locationsIndexes.push(substringLocation);
        }

        if (referenceSubstringLocation !== -1) {
            locationsIndexes.push(referenceSubstringLocation);
        }

        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(errorText),
            locations: locationsIndexes,
        });

        return validation;
    }

    // tslint:disable-next-line:max-line-length
    public static shouldContainBefore(validation: Validation, characterOrText: string, referenceCharacterOrText: string, minDistance: number = 1): Validation {
        let substringLocation: number = -1;
        const allSubstringLocations: number[] = StringTools.returnSubstringMatchingIndexes(validation.result.text, characterOrText);
        if (allSubstringLocations.length > 0) {
            substringLocation = allSubstringLocations[0];
        }

        const referenceSubstringLocation: number = validation.result.text.lastIndexOf(referenceCharacterOrText);
        const distance: number = Math.abs(substringLocation - referenceSubstringLocation);

        if (substringLocation !== -1 &&
            referenceSubstringLocation !== -1 &&
            referenceSubstringLocation > substringLocation &&
            distance >= minDistance
        ) {
            return validation;
        }

        // tslint:disable-next-line:max-line-length
        let errorText: IValidationErrorText = StringTools.specialCharReplaceSpecific(ErrorTexts.SHOULD_CONTAIN_BEFORE, "~", characterOrText);
        errorText = StringTools.specialCharReplaceSpecific(errorText, "&", referenceCharacterOrText);
        errorText = StringTools.specialCharReplaceSpecific(errorText, "#", minDistance.toString());

        const locationsIndexes: number[] = [];

        if (substringLocation !== -1) {
            locationsIndexes.push(substringLocation);
        }

        if (referenceSubstringLocation !== -1) {
            locationsIndexes.push(referenceSubstringLocation);
        }

        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(errorText),
            locations: locationsIndexes,
        });

        return validation;
    }

    // tslint:disable-next-line:max-line-length
    public static shouldContainAt(validation: Validation, textOrCharacter: string, positionIndex: number, fromTheBeginning: boolean = true, autocorrect: boolean = true): Validation {
        let positionIndexFinal: number = positionIndex;
        if (!fromTheBeginning) {
            positionIndexFinal = validation.result.text.length - 1 - positionIndex;
        }

        if (StringTools.containsAt(validation.result.text, textOrCharacter, positionIndexFinal)) {
            return validation;
        }

        if (!autocorrect || validation.result.text.length - 2 < positionIndexFinal || !fromTheBeginning) {
            let errorText: IValidationErrorText = fromTheBeginning ?
                                                    ErrorTexts.SHOULD_CONTAIN_AT_FROM_BEGGINING :
                                                    ErrorTexts.SHOULD_CONTAIN_AT_FROM_BOTTOM;
            errorText = StringTools.specialCharReplaceSpecific(errorText, "~", (positionIndex + 1).toString());
            errorText = StringTools.specialCharReplaceSpecific(errorText, "&", textOrCharacter);

            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(errorText),
                locations: [positionIndexFinal],
            });
        } else {
            validation.result.text = StringTools.insert(validation.result.text, textOrCharacter, positionIndexFinal);
        }

        return validation;
    }

    public static passwordConfirmation(validation: Validation, password: string | (() => string)): Validation {
      let match: boolean = false;
      if (typeof password === "string") {
        match = validation.result.text === password;
      } else {
        match = validation.result.text === password();
      }

      if (!match) {
          validation.result.isValid = false;
          validation.result.errors.push({
              description: getErrorInLanguage(ErrorTexts.CONFIRM_PASSWORD),
              locations: [],
          });
      }

      return validation;
    }

    public static emailConfirmation(validation: Validation, email: string | (() => string)): Validation {
      let match: boolean = false;
      if (typeof email === "string") {
        match = validation.result.text === email;
      } else {
        match = validation.result.text === email();
      }

      if (!match) {
          validation.result.isValid = false;
          validation.result.errors.push({
              description: getErrorInLanguage(ErrorTexts.CONFIRM_EMAIL),
              locations: [],
          });
      }

      return validation;
    }

    public static customRegex(validation: Validation, regex: RegExp, invert: boolean = false): Validation {
        let result: boolean = regex.test(validation.result.text);

        if (invert) {
            result = !result;
        }

        if (!result) {
            validation.result.isValid = false;
            validation.result.errors.push({
                description: getErrorInLanguage(ErrorTexts.CUSTOM_REGEX),
                locations: [],
            });
        }

        return validation;
    }
}
