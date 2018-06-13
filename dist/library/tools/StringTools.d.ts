import { IValidationErrorText } from "..";
export declare class StringTools {
    static specialCharReplaceSpecific(originalErrorText: IValidationErrorText, character: string, replaceBy: string): IValidationErrorText;
    static specialCharReplace(originalErrorText: IValidationErrorText, replaceBy: string): IValidationErrorText;
    static returnAllCharacterIndexes(text: string): number[];
    static returnAllCharacterIndexesSince(text: string, since?: number): number[];
    static returnMatchingIndexes(text: string, regEx: RegExp): number[];
    static returnNotMatchingIndexes(text: string, regEx: RegExp, exceptions?: string[]): number[];
    static returnSubstringMatchingIndexes(text: string, substringToFind: string): number[];
    static returnSpacesLocations(text: string): number[];
    static returnDoubleSpacesLocations(text: string): number[];
    static returnWordsFirstLetterLocations(text: string): number[];
    static returnWords(text: string): string[];
    static removeCharacters(text: string, charactersIndexes: number[]): string;
    static replaceAt(text: string, index: number, replacement: string): string;
    static removeAt(text: string, index: number): string;
    static removeCharactersSince(text: string, characterIndex: number): string;
    static insert(source: string, textToInsert: string, positionToInsert: number): string;
    static containsAt(text: string, substring: string, location: number): boolean;
}
