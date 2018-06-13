import { IValidationErrorText } from "..";

export class StringTools {

    public static specialCharReplaceSpecific(originalErrorText: IValidationErrorText, character: string, replaceBy: string): IValidationErrorText {
        const result: IValidationErrorText = { ...originalErrorText } as IValidationErrorText;
        for (const key of Object.keys(result)) {
            result[key] = result[key].replace(character, replaceBy);
        }
        return result;
    }

    public static specialCharReplace(originalErrorText: IValidationErrorText, replaceBy: string): IValidationErrorText {
        return StringTools.specialCharReplaceSpecific(originalErrorText, "~", replaceBy);
    }

    public static returnAllCharacterIndexes(text: string): number[] {
        const result: number[] = [];
        for (let i: number = 0; i < text.length; i++) {
            result.push(i);
        }
        return result;
    }

    public static returnAllCharacterIndexesSince(text: string, since: number = 0): number[] {
        const result: number[] = [];
        for (let i: number = 0; i < text.length; i++) {
            if (i >= since) {
                result.push(i);
            }
        }
        return result;
    }

    public static returnMatchingIndexes(text: string, regEx: RegExp): number[] {
        const result: number[] = [];

        for (let i: number = 0; i < text.length; i++) {
            if (regEx.test(text[i])) {
                result.push(i);
            }
        }

        return result;
    }

    public static returnNotMatchingIndexes(text: string, regEx: RegExp, exceptions: string[] = null): number[] {
        const result: number[] = [];

        for (let i: number = 0; i < text.length; i++) {
            if (!regEx.test(text[i])) {
                if (exceptions != null && exceptions.indexOf(text[i]) !== -1) {
                    continue;
                }
                result.push(i);
            }
        }

        return result;
    }

    public static returnSubstringMatchingIndexes(text: string, substringToFind: string): number[] {
        if (!substringToFind) {
            return [];
        }

        const result: number[] = [];
        let pos: number = null;
        let i: number = -1;

        while (pos !== -1) {
            pos = text.indexOf(substringToFind, i + 1);
            if (pos !== -1) {
                result.push(pos);
            }
            i = pos;
        }

        return result;
    }

    public static returnSpacesLocations(text: string): number[] {
        const spaceTester: RegExp = new RegExp(/^\s$/);
        const result: number[] = [];

        for (let i: number = 0; i < text.length; i++) {
            if (spaceTester.test(text[i])) {
                result.push(i);
            }
        }

        return result;
    }

    public static returnDoubleSpacesLocations(text: string): number[] {
        const result: number[] = [];
        text.replace(/\s{2,}/g, (matchString: string, locationIndex: number) => {
            result.push(locationIndex);
            return "";
        });
        return result;
    }

    public static returnWordsFirstLetterLocations(text: string): number[] {
        const result: number[] = [];
        const words: string[] = text.split(/\s+/);
        if (text.length > 0) {
            result.push(0);
        }
        let prevWordPos: number;
        for (let i: number = 1; i < words.length; i++) {
            prevWordPos = result[i - 1] + words[i - 1].length;
            result.push((text.indexOf(words[i], prevWordPos)));
        }
        return result;
    }

    public static returnWords(text: string): string[] {
        return text.split(/\s+/);
    }

    public static removeCharacters(text: string, charactersIndexes: number[]): string {
        for (const index of charactersIndexes) {
            text = text.substring(0, index) + text.substring(index + 1, text.length);
        }

        return text;
    }

    public static replaceAt(text: string, index: number, replacement: string): string {
        return text.substr(0, index) + replacement + text.substr(index + replacement.length);
    }

    public static removeAt(text: string, index: number): string {
        return text.substring(0, index) + text.substring(index + 1, text.length);
    }

    public static removeCharactersSince(text: string, characterIndex: number): string {
        const indexesToRemove: number[] = StringTools.returnAllCharacterIndexesSince(text, characterIndex);
        return StringTools.removeCharacters(text, indexesToRemove);
    }

    public static insert(source: string, textToInsert: string, positionToInsert: number): string {
        return source.substr(0, positionToInsert) + textToInsert + source.substr(positionToInsert);
    }

    public static containsAt(text: string, substring: string, location: number): boolean {
        if (text.length < location + substring.length) {
            return false;
        }
        for (let i: number = 0; i < substring.length; i++) {
            if (substring[i] === text[i + location]) {
                continue;
            }
            return false;
        }
        return true;
    }

}
