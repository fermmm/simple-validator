import { getErrorInLanguage, IValidationErrorData, Validation } from "..";
import { ErrorTexts } from "../strings/ErrorTexts";
import { StringTools } from "../tools/StringTools";

export class SizeValidators {

  public static minChars(validation: Validation, charsAmount: number): Validation {
    if (validation.result.text.length >= charsAmount) {
      return validation;
    }

    validation.result.isValid = false;
    validation.result.errors.push({
      description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.MIN_CHARS, charsAmount.toString())),
      locations: [],
    });

    return validation;
  }

  public static maxChars(validation: Validation, charsAmount: number, autocorect: boolean): Validation {
    if (validation.result.text.length <= charsAmount) {
      return validation;
    }

    if (!autocorect) {
        validation.result.isValid = false;
        validation.result.errors.push({
            description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.MAX_CHARS, charsAmount.toString())),
            locations: StringTools.returnAllCharacterIndexesSince(validation.result.text, charsAmount),
        });
    } else {
        validation.result.text = validation.result.text.slice(0, -(validation.result.text.length - charsAmount));
    }

    return validation;
  }

  public static minWords(validation: Validation, minimum: number): Validation {
    const amountOfWords: number = validation.result.text.trim().split(/\s+/).length;

    if (!(minimum > 0 && amountOfWords < minimum)) {
        return validation;
    }

    validation.result.isValid = false;
    validation.result.errors.push({
        description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.MIN_WORDS, minimum.toString())),
        locations: [],
    });

    return validation;
  }

  public static maxWords(validation: Validation, maximum: number, autocorrect: boolean = true): Validation {
    const amountOfWords: number = validation.result.text.trim().split(/\s+/).length;

    if (!(maximum > 0 && amountOfWords > maximum)) {
        return validation;
    }

    const wordsLocations: number[] = StringTools.returnWordsFirstLetterLocations(validation.result.text);

    if (autocorrect && wordsLocations.length > maximum) {
        validation.result.text = StringTools.removeCharactersSince(validation.result.text, wordsLocations[maximum]);
        return validation;
    }

    let errorLocations: number[] = [];
    if (wordsLocations.length >= maximum) {
        errorLocations = StringTools.returnAllCharacterIndexesSince(validation.result.text, wordsLocations[maximum]);
    }

    validation.result.isValid = false;
    validation.result.errors.push({
        description: getErrorInLanguage(StringTools.specialCharReplace(ErrorTexts.MAX_WORDS, maximum.toString())),
        locations: errorLocations,
    });

    return validation;
  }
}
